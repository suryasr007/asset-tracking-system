var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


//Models
const User = require('../../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registration');
});

router.post('/', (req, res, next)=>{
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
                  res.redirect('/');
                })
                .catch(err => console.log(err));
            });
          });
        }
      })
  }
});

module.exports = router;
