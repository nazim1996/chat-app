const moongose = require("mongoose");

const peopleSchema = moongose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        // mobile:{
        //     type: String,
        //     required: true,
        // },
        password: {
            type: String,
            required: true
        }
    }
    // {
    //     timestamps: true
    // }
);

const People = moongose.model("People", peopleSchema);
module.exports = People;