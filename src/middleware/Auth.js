var auth= (req,res,next)=>{
    const password= 'kdbjbv';
    if(password==='kdbjbv'){
        console.log("Successfully authenticated");
        next();
    }
    else {
        console.log("Invalid Username/Password");
    }
}

module.exports= {auth};