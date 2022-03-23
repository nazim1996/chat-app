const express = require("express");
const router = express.Router();

const {doLogin} = require("../controllers/loginController")
// const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { loginValidator, loginUserValidatorHandler }  = require("../middlewares/validator/loginValidator");


router.post("/", loginValidator, loginUserValidatorHandler, doLogin);

module.exports = router;