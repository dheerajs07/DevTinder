const jwt= require('jsonwebtoken')
const User= require('../model/user')
var userAuth= async (req,res,next)=>{

    try{

        const cookie= req.cookies;
        const {token}= cookie;
        if(!token){
            throw new Error("Invalid Token!!!");
        }
        const decodedMessage= await jwt.verify(token, 'Devil@123');
        const {_id}=decodedMessage;
        const user= await User.findById(_id)
        if(!user){
            throw new Error ("User not found");
        }
        req.user= user;
        next();

    }catch(err){
        res.status(400).send("Error : " + err.message)
    }

}

module.exports= {userAuth};