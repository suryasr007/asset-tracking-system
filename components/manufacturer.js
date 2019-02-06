const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();

// default options
// Max size one mb
router.use(fileUpload({
  limits: { fileSize: 1 * 1024 * 1024 },
  createParentPath: true,
  safeFileNames: /\\/g,
  preserveExtension: true
}));

const { ensureAuthenticated } = require('../config/auth');

router.get('/create_request', ensureAuthenticated, (req, res, next) =>
  res.render('forms/manufacturer-request-form', { layout: 'layouts/dashboard-layout', user: req.user })
);

router.post('/create_request', ensureAuthenticated, (req, res, next) =>{
  console.log(req.body);
  console.log(req.user);
  if (Object.keys(req.files).length != 0) {
    let file = req.files.manufacturer_attachments;
    console.log(file);    
    file.mv('uploads/'+file.name, function(err) {
    if (err)
      return res.status(500).send(err);
    });
  }

  res.send('ok');
});

module.exports = router;