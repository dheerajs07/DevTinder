const express= require ("express");
const app= express();

app.use("/welcome", (req,res)=>{
    res.send("Welcome to dummy project");
})

app.use("/dashboard", (req,res)=>{
    res.send("hello to dashboard");
})

app.listen(7777, ()=>{
    console.log("Server running on port 7777");
});