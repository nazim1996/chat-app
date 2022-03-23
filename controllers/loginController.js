const bcrypt = require("bcrypt");
const User = require("../models/people")
const jwt = require("jsonwebtoken");

async function doLogin (req, res, next){
    try {
        const result = await  User.findOne({email : req.body.email});
        if(result && result._id){
            const isValidPassword = await bcrypt.compare(req.body.password, result.password);
            if(isValidPassword){

                const userObject = {
                    username: result.name,
                    mobile: result.email,
                };
                const token = jwt.sign(userObject, process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRY
                });

                // res.cookie(process.env.COOKIE_NAME, token, {
                //     maxAge: process.env.JWT_EXPIRY,
                //     httpOnly: true,
                //     signed: true
                // });
                // res.locals.loggedInuser = userObject;
                res.status(200).json({
                    message: "Login success!",
                    token: token,
                    cookie: process.env.COOKIE_NAME,
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed: true
                })
            }else{
                res.status(400).json({
                    errors : {
                        password:{
                            value: req.body.password,
                            msg: "Invalid password!",
                            param : "password",
                            location: "body"
                        }
                    }
                })
            }
        }else{
            res.status(400).json({
                errors : {
                    email:{
                        value: req.body.email,
                        msg: "No user found with this email id!",
                        param : "email",
                        location: "body"
                    }
                }
            })
        }
    } catch(err){
        res.status(400).json({
            errors: {
                message: "Unknow error occured!",
            }
        });
    }
}

module.exports ={
    doLogin
}