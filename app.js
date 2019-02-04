const path = require("path");
const express = require("express");
const passport = require('passport');
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
// const logger = require('morgan');

var app = express();

require('./config/passport')(passport);

// db
const db = require("./config/keys").MongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log(err));

// view engine setup
// EJS
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// app.use('/public', express.static('/public'))

app.use("/user", require("./components/user"));
app.use("/dashboard", require("./components/dashboard"));

app.get("/", (req, res) => res.send("welcome page"));
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "DEVELOPMENT" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
