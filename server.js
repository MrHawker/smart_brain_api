const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require( 'cors');
const knex = require('knex');
const register = require("./controller/register"); 
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image')
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'monkey6886*#*',
      database : 'smart_brain'
    }
  });
const app = express();
app.use(bodyParser.json());
app.use(cors());
   
app.get('/',(req,res) =>{
    db.select('*').from('users').then(data=>{
        res.json(data);   
    })
})
app.get('/profile/:id',(req,res)=>profile.handleProfile(req,res,db)
)
app.post('/register',register.handleRegister(db,bcrypt)
)
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})
// const port = process.env.port
// app.listen(port, ()=>{
//     console.log(`server is running on port ${port}`);
// })
app.listen(3000, ()=>{
        console.log(`server is running on port 3000`);
})