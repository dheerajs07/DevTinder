const express= require("express");
const userRouter= express.Router();
const sendConnection= require('../model/sendConnection');
const {userAuth}= require('../middleware/Auth')
userRouter.get("/user/requests/received", userAuth, async(req,res)=>{
    try{
        const loggedInUser= req.user;
        const data= await sendConnection.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId" , "firstName lastName age gender photoUrl about skills")

         res.status(200).send({message:"Data  fetched Successfully", data})
    }catch(err){
        res.status(400).send("error : "+ err.message)
    }

})

userRouter.get("/user/connections", userAuth , async(req,res)=>{
    try{
        const loggedInUser= req.user;

        const connectionRequest= await sendConnection.find({
            $or:[
                {toUserId:loggedInUser._id, status:"accepted"},
                {fromUserId:loggedInUser._id, status:"accepted"},
            ],
        }).populate("fromUserId" , "firstName lastName age gender photoUrl about skills")
          .populate("toUserId" , "firstName lastName age gender photoUrl about skills");

        const data= connectionRequest.map((item)=>{
            return (item.fromUserId._id.toString()===loggedInUser._id.toString()) ? item.toUserId : item.fromUserId ; 
        });
        res.status(200).send({data});
    }catch(err){
        res.status(400).send("error : " + err.message)
    }
})



module.exports= userRouter;