const { client } = require('../model/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Sequelize } = require('sequelize')
const secret = 'mysecret'
const UserService = require('../service/users')

const getallusers =  async (req,res) => {
    try{
        const users = await UserService.getallusers()
        console.log(users)
        return res.json(users)
    }catch(error){
        console.log('error',error)
        res.status(401).json({
            message:'authentication fail',
            error
        })
    }
}
//insert user
const createUsers = async (req,res) => {
    const {name , age} = req.body;
    try{
        if(!name ||!age){
            return res.status(400).send({error:true , message:"please provide id name age"});
        }else{
            const users = await UserService.createUsers(name,age)
            return res.send({error:false,data:users,message:"add success"})
        }     
    }catch(error){
        console.log('error',error)
        res.status(401).json({
            message:'Insert error',
            error
        })
    }
}

///get user by id
const getUsersById = (req,res) =>{
    let id = req.params.id;

    if(!id){
        return res.status(400).send({error:true,message:"Please check id"});
    } else {
        client.query("SELECT * FROM users WHERE id = $1",[id],(error,results)=>{
            // console.log(res)
            if(error) throw error;
            let message = "" ;
            if(results === undefined || results.length == 0){
                message = "user not found";
            } else {
                message = " Success "
            }
            return res.send({error:false,data:results.rows,message:message})
        })
    }
}

///update users
const updateUsers = async (req,res) => {
    const {id ,name ,age} = req.body;
    try{
        if(!id){
            return res.status(400).send({error:true,message:'please check id'});
        } else { 
            const users = await UserService.updateUsers(id,name,age)
            return res.send({error:false,data:users})
        }
    }catch(error){
        console.log('error',error)
        res.status(401).json({
            message:'update error',
            error
        })
    }
    
}
const deleteUsers = async (req,res) =>{
    let id = req.body.id;
    try{
        if(!id){
            return res.status(400).send({error:true,message:"check id"});
        } else {
            const users = await UserService.deleteUsers(id)
            return res.send({error:false,data:users})
        }             
    }catch(error){
        console.log('error',error)
        res.status(401).json({
            message:'delete error',
            error
        })
    }
    
}

//////////////////////////Login Authentication 
const createUsersdata = async (req,res) => {
    const {email , password} = req.body;
    const passwordHash = await bcrypt.hash(password,10)
    try{
        if(!email || !password ){
            return res.status(400).send({error:true , message:"please provide email password"});
        } else {
            const users = await UserService.createUsersdata(email,passwordHash)
            return res.send({error:false,data:users,message:"add success"})       
        }
    }catch(error){
        console.log('error',error)
        res.status(401).json({
            message:'createuser error',
            error
        })
    } 
}



const checkusersdata = async (req,res) => {
    const {email , password} = req.body;
    try{   
        const users = await UserService.checkusersdata(email);
        userdata = users.rows[0].password
        const match = await bcrypt.compare(password,userdata)
        if(!match) {
            res.status(400).json({
                message:"login fail"
            })
            return false
        }
        // // create token jwt 
        const token = jwt.sign({email},secret,{expiresIn:'1h'})
        res.cookie('token', token, {
            maxAge: 600000,
            secure: false,
            httpOnly: false,
            sameSite: "lax",
            domain: "localhost",
            path:"/"
        });
        return res.json({
            message:'login success',
        })
    }catch(error){
        console.log('error',error)
        res.status(401).json({
            message:'Check error',
            error
        })
    }
    // 
    

}


const getallusersdata = async (req,res) => {
    try{
        // const authHeader = req.headers['authorization']//if cookie token del 2
        // console.log(req.cookies.token)
        const authToken = req.cookies.token //cookieToken 2
        // console.log('authHeader',authToken)
        // let authToken = '' //del 2
        // if(authHeader){ //del 2
        //     authToken = authHeader.split(" ")[1] //del 2
        // }
        // console.log('authToken',authHeader.split(" ")[1])
        // if(!req.session.userId){
        //     throw{message:'Auth fail'}
        // } // 3

        /////////check authtoken my server 
        const user = jwt.verify(authToken,secret)///jwt check my secret in project if match show result 
        // res.send(user) 
        // console.log(user)
        ////recheck form database || server
        const checkresult = await client.query('SELECT * FROM usersdata WHERE email = $1' , [user.email]) // del if 3
        if(!checkresult.rows){
            throw{message : 'user not found'} // del if 3
        }
        // else{
        //     throw{message: 'Login Success'}
        // }

        client.query("SELECT * FROM usersdata",(error,results) => {
            if(error) throw error;
            return res.json({'users': results.rows});
        })

    }catch(error){
        console.log('error',error)
        res.status(401).json({
            message:'authentication fail',
            error
        })
    }
    
}


module.exports = {
    getUsersById,
    getallusers,
    createUsers,
    updateUsers,
    deleteUsers,
    createUsersdata,
    getallusersdata,
    checkusersdata
}
