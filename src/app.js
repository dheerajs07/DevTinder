const express= require('express');
const { userAuth}= require('./middleware/Auth')
const {connectDB}= require('./config/database');
const app= express();
const User= require('./model/user');
const { after } = require('node:test');
const {validateSignUpdata}= require ('./utils/validate')
const bcrypt= require ('bcrypt');
const cookieParser= require ('cookie-parser');
const jwt = require('jsonwebtoken');
const authRouter= require('./routes/auth');
const profileRouter= require('./routes/profile');
const requestRouter= require('./routes/request')
const userRouter= require('./routes/user');

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter)

connectDB().then(()=>{
    console.log("Connected to database sucessfully")
    app.listen(3000, ()=>{
    console.log('Server listening on pORT 3000');
    });
}).catch((err)=>{
    console.log(err);
})

