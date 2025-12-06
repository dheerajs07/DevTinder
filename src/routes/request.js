const {userAuth} = require("../middleware/Auth")
const express = require ('express');
const connectionRequestModel= require('../model/sendConnection');
const requestRouter= express.Router();
const User= require('../model/user')

requestRouter.post("/request/send/:status/:touserId", userAuth , async(req,res)=>{
   try{
      const status= req.params.status;
      const toUserId= req.params.touserId;
      const fromUserId= req.user._id;

      const allowedStatus= ["ignored","interested"];
      if(!allowedStatus.includes(status)){
         return res.status(400).send({message:"Status not allowed"})
      }

      const connectionrequest= await connectionRequestModel.findOne({
         $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId, toUserId:fromUserId}
         ]
         
      })

      if(connectionrequest){
         return res.status(400).send({message:"Cannot duplicate request"})
      }

      const toUser= await User.findById(toUserId);
      if(!toUser){
         return res.status(400).send({message:"User not found"});
      }

      const connection= new connectionRequestModel({
         toUserId,
         fromUserId,
         status,
      })
      const data= await connection.save();
      res.status(200).send({
         message: toUser.firstName+ " " + status , 
         data
      })
   }catch(err){
      res.status(400).send("Error :" +  err.message)
   }  
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res)=>{
   try{
      const loggedInUser= req.user;
      const {status, requestId}= req.params;
      const allowedStatus= ["accepted", "rejected"];
      if(!allowedStatus.includes(status)){
        return res.status(400).send({message:"Invalid status"});
      }

      const connectionRequest= await connectionRequestModel.findOne({
         _id:requestId,
         toUserId:loggedInUser._id,
         status:"interested",
      });
      if(!connectionRequest){
         return res.status(404).send({message:"Request not found"});
      }
      connectionRequest.status=status;
      const data= await connectionRequest.save();
      res.status(200).send({message:"Connection request "+ status, data})

   }catch(err){
      res.status(400).send("Something went wrong"+ err.message)
   }
})

module.exports= requestRouter;
