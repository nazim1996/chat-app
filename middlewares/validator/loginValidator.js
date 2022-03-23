const {check, validationResult} = require('express-validator');
const createError = require("http-errors");

const loginValidator = [
    check("email")
        .isLength({min: 1})
        .withMessage("Email can not be blank!")
        .isEmail()
        .withMessage("Invalid Email address!"),

    check("password")
        .isLength({min: 1})
        .withMessage("Password can not be blank!")
];

const loginUserValidatorHandler = (req, res, next) =>{
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if(Object.keys(mappedErrors).length === 0){
        next();
    }else{
        res.status(400).json({
            errors : mappedErrors
        })
    }
};

module.exports = {
    loginValidator,
    loginUserValidatorHandler
}