var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, (req, res) =>
  res.render('dashboard', { layout: 'layouts/welcome-layout', user: req.user })
  // res.send({user: req.user})
);



module.exports = router;