const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

const User = require("../../models/people");

// add user
const addUserValidators = [
    check("name")
        .isLength({min: 5})
        .withMessage("Name is required")
        .isAlpha("en-US", {ignore: " -"})
        .withMessage("Name must contain anything other than alphabet")
        .trim(),

    check("email")
        .isEmail()
        .withMessage("Invalid Email address")
        .trim()
        .custom(async(value)=>{
            try{
                const user = await User.findOne({email: value});
                if(user){
                    throw createError("Email already is use");
                }
            } catch(err){
                throw createError(err.message);
            }
        }),

    check("password")
        .isStrongPassword()
        .withMessage("Password must be atleast 8 characters long")
];

const addUserValidationHandler = (req, res, next) =>{
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if(Object.keys(mappedErrors).length === 0){
        next();
    } else{
        res.status(400).json({
            errors: mappedErrors,
        });
    }
}

module.exports = {
    addUserValidators,
    addUserValidationHandler
}