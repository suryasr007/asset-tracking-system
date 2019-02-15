const express = require("express");
const router = express.Router();

//Models
const Part = require("../models/Part");
const User = require("../models/User");


const { ensureAuthenticated } = require("../config/auth");

router.get('/active_requests', ensureAuthenticated, (req, res, next)=>{
    // console.log(req);
    // res.send('ok');
    Part.find({supplier_email:req.user.email, supplier_acceptance:'pending'})
    .then((records)=>{
        res.render("view-requests/supplier", {
            layout: "layouts/dashboard-layout",
            user: req.user,
            records
        })
    })
})

router.get('/:record/:status', ensureAuthenticated, (req, res, next)=>{

    Part.findByIdAndUpdate(req.params.record, {supplier_acceptance: req.params.status})
        .then((record)=>{
            res.redirect('/supplier/active_requests');
        })
        .catch((err)=>{
            console.log(err);
            res.redirect(500);
        });
});


router.get('/download/:filename', ensureAuthenticated, (req, res, next)=>{
    console.log('File Name:'+req.params.filename);
    res.download("uploads/" + req.params.filename, (err)=>{
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
    });
})



module.exports = router;