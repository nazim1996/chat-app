// external imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require("body-parser")
var cors = require('cors');

const cookieParser = require('cookie-parser');
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");


// internal imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const app = express();
dotenv.config();

/****Database connection */
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connection successful')) 
.catch(err => console.log(err.message));

/**Request Parser */
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

// Set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.listen(process.env.APP_PORT, ()=>{
    console.log(`app running on port:${process.env.APP_PORT}`);
})