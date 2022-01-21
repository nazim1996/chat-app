const express = require("express");
const router = express.Router();

const {getUsers, addUsers} = require("../controllers/usersController")
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { addUserValidators, addUserValidationHandler }  = require("../middlewares/validator/userValidator");
// const {requestHeaderForAuth, requestHeader} = require('../middlewares/common/requestHeader');

router.get("/", decorateHtmlResponse("users"), getUsers);

//add user
router.post("/", addUserValidators, addUserValidationHandler, addUsers);
// router.post("/", addUsers);

// router.post("/", function(req, res){
//     console.log(req.body);
//     res.send(req.body);
// });

module.exports = router;