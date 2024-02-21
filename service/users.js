// const { query } = require('express');
const { client } = require('../model/db')

exports.getallusers = async () => {
    try {
        var users = await client.query("SELECT * FROM users")
        return users.rows;
    }catch(err){
        throw Error('error')
    }
}

exports.createUsers = async (name,age) =>{
    try{
        var users = await client.query('INSERT INTO users(name,age) VALUES($1,$2)', [name,age])
        return users;
    }catch(err){
        throw Error('error')
    }
}

exports.updateUsers = async (id,name,age) => {
    try{
        var users = await client.query('UPDATE users SET name = $2 , age = $3 WHERE id = $1 ',[id,name,age])
        return users;
    }catch(err){
        throw Error('Error')
    }
}

exports.deleteUsers = async (id) => {
    try{
        var users = await client.query('DELETE FROM users WHERE id = $1',[id])
        return users;
    }catch(err){
        throw Error('Error')
    }
}

exports.createUsersdata = async (email,passwordHash) => {
    try{
        var users = await client.query('INSERT INTO usersdata(email,password) VALUES($1,$2)',[email,passwordHash])
        console.log(users)
        return users;
    }catch(err){
        throw Error('Error')
    }
}

exports.checkusersdata = async (email) => {
    try{
        var users = await client.query('SELECT * FROM usersdata WHERE email = $1',[email]) 
        return users;
    }catch(err){
        throw Error('Error')
    }
}