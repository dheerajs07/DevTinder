const mongoose= require('mongoose');
const { ref } = require('process');

const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignore", "interested","accepted","rejected"],
            message:`{VALUE} is invalid status`
        },
    }
}, {
    timestamps:true,
})

connectionRequestSchema.pre('save', function(next){
    const connectionRequest= this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself");
        
    }
    next();
})

const connectionRequestModel= new mongoose.model("connectionRequest",connectionRequestSchema)
module.exports= connectionRequestModel;