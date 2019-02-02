var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registration');
});

router.post('/', (req, res, next)=>{
  const { name, email, password, password2, address, mobile, type } = req.body;
  let errors = [];

  if(password.length <= 6)
    errors.push({msg:'Minimum Length of password should be 6'})
  if(password != password2)
    errors.push({msg:'Passwords are not matching'})

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
  }
  // res.send(req.body);
});

module.exports = router;
