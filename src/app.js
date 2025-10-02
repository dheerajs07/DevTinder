const express= require('express');
const {auth}= require('./middleware/Auth')
const {connectDB}= require('./config/database');
const app= express();
const User= require('./model/user')

app.post("/signup",async(req,res)=>{
    const user = new User({
        firstName:"Akshay",
        lastNmae:"Saini",
        emailId:"Akshay@saini.com",
        password:"Akshay@123",
        
    });
    try{
        await user.save();
        res.send("User added successfully");
    } catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }
    
})

connectDB().then(()=>{
    console.log("Connected to database sucessfully")
    app.listen(3000, ()=>{
    console.log('Server listening on pORT 3000');
    });
}).catch((err)=>{
    console.log(err);
})

