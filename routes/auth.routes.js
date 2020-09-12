const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')
const User = require('../models/User.model')
/* GET home page */
router.get('/signup', (req, res, next) => res.render('auth'));

const salt = bcryptjs.genSaltSync(10)

router.post('/signup', (req,res, next) => {
    console.log('valeurs', req.body)
    // enregistrer notre user en base
  
    const plainPassword = req.body.password;
  
    const hashed = bcryptjs.hashSync(plainPassword, salt)
    console.log('hashed=', hashed)
  
    User.create({
      username: req.body.username,
      passwordHash: hashed
    }).then(userFromDb => {
      // res.redirect('/profile')
      res.send('user créé!')
    }).catch(err => {
      next(err) // 
    })

})
module.exports = router;
