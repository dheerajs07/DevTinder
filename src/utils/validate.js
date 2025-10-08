
const validator = require ("validator")

function validateSignUpdata(req){
    const {firstName,lastName,emailId,password}= req.body;

    if(!firstName || !lastName){
        throw new Error("First Name or Last Name cannot be empty !!! ")
    } else if(!validator.isEmail(emailId)){
        throw new Error("Enter a valid Email id ");
    } else if (!validator.isStrongPassword(password)){
        throw new Error("Enter a strong Password ");
    }
}

module.exports= {validateSignUpdata};