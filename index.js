const http = require('http');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const app = express();
const cors = require('cors');
const usersRouter = require('./Routes/users');
/////////////////////Authentication
let bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const middleware = require('./middleware/users')
// const session = require('express-session');

// app.use(function(req, res, next) {
//   // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Credentials', true);
//   // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   // next();
// });
// app.use(middleware.goblemiddle)
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


const corsOptions = {
  origin: 'http://localhost:3000', //กำหนดสิทธิ์การเข้าถึง
  credentials: true,/// send cookie
  optionsSuccessStatus: 200,
  methods:"GET,PUT,POST,DELETE,HEAD" //method
};
app.use(cors(corsOptions));

app.get('/users',usersRouter)
app.post('/user',usersRouter)
app.get('/user/:id',usersRouter)
app.put('/user',usersRouter)
app.delete('/user',usersRouter)
//////////////////Login Authen
app.post('/logindata',usersRouter)
app.get('/logindataall',usersRouter)
app.post('/checkdata',usersRouter)
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
