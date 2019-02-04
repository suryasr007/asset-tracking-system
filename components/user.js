var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


//Models
const User = require('../models/User');

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('registration');
});

router.post('/register', (req, res, next)=>{
  const { name, email, password, password2, address, mobile, type } = req.body;
  let errors = [];

  if(password.length <= 6)
    errors.push({msg:'Minimum Length of password should be 6'});
  if(password != password2)
    errors.push({msg:'Passwords are not matching'});

  if(errors.length > 0){
    res.render('registration', {
      errors,
      name, 
      email, 
      password, 
      password2, 
      address, 
      mobile, 
      type
    })
  }else{
    User.findOne({ email:email })
      .then((user)=>{
        if(user){
          errors.push({msg:'An user already exists with this email'})
          res.render('registration', {
            errors,
            name, 
            email, 
            password, 
            password2, 
            address, 
            mobile, 
            type
          })
        }else{
          const newUser = new User({
            name,
            email,
            password,
            address, 
            mobile, 
            type
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then((user) => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/user/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      })
  }
});

router.get('/login', function(req, res, next) {
    res.render('login');
});
  

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/user/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/user/login');
});


module.exports = router;
