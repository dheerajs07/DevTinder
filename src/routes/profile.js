const express = require ('express');
const {userAuth} = require("../middleware/Auth")

const profileRouter= express.Router();

profileRouter.get("/profile",userAuth, async (req,res)=>{
    try{

        const user=req.user;
        if(!user){
            throw new Error("User  does not exist ")
        }
        res.send("Reading Cookies");
    }catch(err){
        res.status(200).send("Something went wrong" + err.message);
    }
    
})

module.exports= profileRouter;