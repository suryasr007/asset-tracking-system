var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);


module.exports = router;