const express = require("express");
const router = express.Router();

const {getLogin} = require("../controllers/loginController")
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { addUserValidators, addUserValidationHandler }  = require("../middlewares/validator/userValidator");


// router.get("/", decorateHtmlResponse("login"),  getLogin);
// router.post("/", addUserValidators, addUserValidationHandler, doLogin);

module.exports = router;