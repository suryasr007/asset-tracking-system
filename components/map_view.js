const express = require("express");
const router = express.Router();

//Models
const Part = require("../models/Part");
const User = require("../models/User");


const { ensureAuthenticated } = require("../config/auth");

router.get("/:recordId", ensureAuthenticated, (req, res, next) =>{
    let locations = [];
    Part.findById(req.params.recordId, (err, record)=>{
        if (err){
          req.flash("error_msg", "Unable to fetch the record. Please try again later.");
          console.log(err);      
          res.redirect("/manufacturer/view_requests");
        }
        console.log(record.supplier_address);
        locations.push(record.supplier_address);
        User.findById(record.manufacturer_id,  (err, record)=>{
            if (err){
              req.flash("error_msg", "Unable to fetch the record. Please try again later.");
              console.log(err);      
              res.redirect("/manufacturer/view_requests");
            }
            console.log(record.address); 
            locations.push(record.address);
            res.render("map_view", {
                layout: "layouts/dashboard-layout",
                user: req.user,
                locations
            });
        });
    });
});

module.exports = router;
