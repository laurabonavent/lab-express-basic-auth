const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");


/* GET home page */
router.get("/signup", (req, res, next) => res.render("auth"));

const salt = bcryptjs.genSaltSync(10);

router.post("/signup", (req, res, next) => {
  console.log("valeurs", req.body);
  // enregistrer notre user en base

  const plainPassword = req.body.password;

  const hashed = bcryptjs.hashSync(plainPassword, salt);
  console.log("hashed=", hashed);

  User.create({
    username: req.body.username,
    passwordHash: hashed,
  })
    .then((userFromDb) => {
      // res.redirect('/profile')
      res.send("user créé!");
    })
    .catch((err) => {
      next(err); //
    });
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render("login", {
      errorMessage: "c'est FAUX",
    });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.render("login", { errorMessage: "error" });
        return;
      }

      if (bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.user = user;

        res.send("loggé");
      } else {
        res.render("login", { errorMessage: "blabla" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/profile", (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login')
  }
  
  res.render('users/userProfile', {
    user: req.session.user
  })
})
module.exports = router;
