const mongoose = require('mongoose');

const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://Devil07:qwyXm9BQoyfIJ5N8@cluster0.ez3y4ky.mongodb.net/DevTinder")
}

module.exports={connectDB};
