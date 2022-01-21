const {check} = require('express-validator');
const createError = require("http-errors");

const user = require("../../models/people")