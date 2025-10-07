const express= require('express');
const {auth}= require('./middleware/Auth')
const {connectDB}= require('./config/database');
const app= express();
const User= require('./model/user');
const { after } = require('node:test');

app.use(express.json());

app.get("/user", async (req,res)=>{
    const body= req.body.emailId;
    try{

        const user=await  User.find({emailId:body} );
        if(user.length ===0){
            res.send("User not found");

        }
        else {
            res.send(user);
        }
        
    } catch(err){
        res.status(200).send("Something went wrong" + err.message);
    }
})


app.get("/feed", async(req,res)=>{
    try{
        const user=await  User.find({});
        if(user.length===0){
            res.send("No connection in your feed ");
        } else {
            res.send(user);
        }
    } catch(err){
        res.status(400).send("Something went wrong")
    }
})

app.post("/signup",async(req,res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully");
    } catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }
    
})

app.delete("/user", async (req,res)=>{
    const usr= req.body._id;
    try{
        const user = await User.findByIdAndDelete(usr);
        res.send("User deleted successfully");
    }catch(err){
        res.status("Something went wrong ");
    }
})

app.patch("/user/:userId", async(req,res)=>{
    const userId= req.params?.userId;
    const data= req.body;
    
    try{
        const ALLOWED_UPDATES=["gender","age","about","photoUrl","Skills"];
        const isAllowed= Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        )
        if(!isAllowed){
            throw new Error("Update not allowed .")
        }
        
        if(data?.Skills?.length>10){
            throw new Error("Skills cannot be greater than 10")
        }

        const user = await User.findByIdAndUpdate({_id:userId}, data, {
            runValidators:true,
            returnDocument:after,
        })
        res.send("User updated")
        console.log(user);
    }
    catch(err){
        res.status(400).send("Something went wrong " + err.message);
    }
} )

connectDB().then(()=>{
    console.log("Connected to database sucessfully")
    app.listen(3000, ()=>{
    console.log('Server listening on pORT 3000');
    });
}).catch((err)=>{
    console.log(err);
})

