const bcrypt = require("bcrypt");

const User = require("../models/people")


// get users page
const getUsers = (req, res, next) =>{
    res.render("users");
}

// add user
async function addUsers(req, res, next){
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    newUser = new User({
        ...req.body,
        password : hashedPassword,
    });

    try{
        const result = await newUser.save();
        res.status(200).json({
            message: "Users was added successfully!"
        });
    } catch(err){
        res.status(400).json({
            errors:{
                common: {
                    msg: "Unknow error occured!"
                }
            }
        });
    }
}

module.exports ={
    getUsers,
    addUsers
}