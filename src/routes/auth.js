const express= require ('express');
const {validateSignUpdata}= require ('../utils/validate')
const authRouter= express.Router();
const bcrypt= require ('bcrypt');
const User= require('../model/user')
authRouter.post("/signup",async(req,res)=>{
    try{
    validateSignUpdata(req);

    const {firstName,lastName,emailId,password, age, gender}= req.body;

    const hashedPassword= await bcrypt.hash(password,10);


    const user = new User({
        firstName,lastName,emailId,password:hashedPassword, age, gender
    });
    
        await user.save();
        res.send("User added successfully");
    } catch(err){
        res.status(400).send("Error : " + err.message);
    }
    
})

authRouter.post("/login", async(req,res)=>{

    try{
        const {emailId,password}= req.body;
        const user= await User.findOne({emailId:emailId});
        if(!user){
            throw new Error ("Invalid Credentials!!!")
        }
        const isValidPassword=await  user.validatePassword(password);
        if(isValidPassword){
            // Create a JWT token 
            const token= await user.getJWT();
            
            // send the token inside a cookie 
            res.cookie('token',token,{
                expires: new Date(Date.now()+ 12*3600000),
            });

            res.send("login successful");
            
        }else{
            throw new Error("Invalid Credentials")
        }

    }catch(err){
        res.status(400).send("Error : " + err.message);
    }

})

authRouter.post("/logout", async(req,res)=>{
    res.cookie("token", null, {
        expires:new Date(Date.now())
    })

    res.send("Logout Successful")
})
module.exports= authRouter;