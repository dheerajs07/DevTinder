const mongoose= require('mongoose');
const validator= require('validator');

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:25,
        trim:true,
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:25,
        trim:true,
    },
    emailId:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email address" + value)
            }
        } ,
    },
    gender:{
        type:String,
        required:true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Invalid gender input");
            }
        },
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Weak Password!! Re-enter a strong password" + value)
            }
        } 
    },
    age:{
        type:Number,
        required:true,
        min:18,
    },
    photoUrl:{
        type:String,
        default:"https://cyber.comolho.com/static/img/avatar.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL" + value)
            }
        } 
    },
    about:{
        type:String,
        default:"This is default about the user!!!"
    },
    Skills:{
        type:[String],
    },

},{
    timestamps:true,
})

module.exports= mongoose.model("User",userSchema);