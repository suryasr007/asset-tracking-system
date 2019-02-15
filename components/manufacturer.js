const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();


//Models
const Part = require("../models/Part");
const User = require("../models/User");

// default options
// Max size one mb
router.use(
  fileUpload({
    limits: { fileSize: 1 * 1024 * 1024 },
    createParentPath: true,
    safeFileNames: /\\/g,
    preserveExtension: true
  })
);

const { ensureAuthenticated } = require("../config/auth");

router.get("/create_request", ensureAuthenticated, (req, res, next) =>
  res.render("forms/manufacturer-request-form", {
    layout: "layouts/dashboard-layout",
    user: req.user
  })
);

router.post("/create_request", ensureAuthenticated, (req, res, next) => {
  const {
    part_name,
    part_number,
    supplier_name,
    supplier_email,
    supplier_address,
    supplier_mobile
  } = req.body;
  let file_upload_path = null;
  let errors = [];

  User.findOne({ email: supplier_email, type: "supplier" })
    .then(user => {
      if (!user) {
        errors.push("Supplier is not registered");
      }
      if (Object.keys(req.files).length != 0) {
        let file = req.files.manufacturer_attachments;
        console.log(file);
        file_upload_path = Date.now() + file.name;
        file.mv("uploads/" + file_upload_path, function(err) {
          if (err) errors.push("Unable to upload file");
          console.log(err);
        });
      }
      // If any errors render error page
      if (errors.length > 0) {
        res.render("forms/manufacturer-request-form", {
          layout: "layouts/dashboard-layout",
          errors: errors,
          user: req.user,
          part_name,
          part_number,
          supplier_name,
          supplier_email,
          supplier_address,
          supplier_mobile
        });
      } else {
        const newPart = new Part({
          part_name,
          part_number,
          manufacturer_id: req.user._id,
          supplier_name,
          supplier_email,
          supplier_address,
          supplier_mobile,
          uploaded_file_path: file_upload_path
        });

        newPart
          .save()
          .then(part => {
            console.log(part);
            req.flash("success_msg", "Part has been successfully registered");
            res.redirect("/manufacturer/create_request");
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
});


router.get("/view_requests", ensureAuthenticated, (req, res, next) =>

  // Get all records the database
  Part.find({manufacturer_id: req.user._id})
    .then((docs)=>{
      res.render("view-requests/manufacturer", {
        layout: "layouts/dashboard-layout",
        user: req.user,
        records: docs
      })
    })
    .catch((err)=>{
      console.log(err);
    })
)

router.get("/requests/:recordId", ensureAuthenticated, (req, res, next)=>{
  Part.findById(req.params.recordId, (err, record)=>{
    if (err){
      req.flash("error_msg", "Unable to fetch the record. Please try again later.");
      console.log(err);      
      res.redirect("/manufacturer/view_requests");
    }
    res.render("request-details/manufacturer", {
      layout: "layouts/dashboard-layout",
      user: req.user,
      record
    });
  });
});




router.get("/requests/delete/:recordId", ensureAuthenticated, (req, res, next)=>{
  Part.findByIdAndRemove(req.params.recordId, (err, record)=>{
    if (err){
      req.flash("error_msg", "Unable to delete requested delete. Please try again later.");
      res.redirect("/manufacturer/view_requests");
    }
    res.redirect("/manufacturer/view_requests");
  });
});

module.exports = router;
