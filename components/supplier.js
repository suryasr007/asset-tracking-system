const express = require("express");
const router = express.Router();

//Models
const Part = require("../models/Part");
const User = require("../models/User");


const { ensureAuthenticated } = require("../config/auth");



module.exports = router;