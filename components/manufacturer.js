var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/create-request', ensureAuthenticated, (req, res) =>
  res.render('forms/manufacturer-request-form', { layout: 'layouts/dashboard-layout', user: req.user })
);

module.exports = router;