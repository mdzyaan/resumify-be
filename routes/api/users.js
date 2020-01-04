const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");
const secretOrKey = process.env.SECRET;

router.get("/profile", (req, res) => {
  const token = req.body.token;
  jwt.verify(token, secretOrKey, function(err, decode) {
    if (!err) {
      User.findOne({_id: decode.id}).then(users => {
        if (users) res.status(200).json(users);
      });
    } else {
      res.send(err);
    }
  })
});


router.post("/profile", (req, res) => {
  const token = req.body.token || '';
  jwt.verify(token, secretOrKey, function(err, decode) {
    if (!err) {      
      User.update(
        { _id: decode.id },
        {$set: {...req.body}},
        { upsert: true },
        function(err, doc) {
          if (err) return res.send(500, { error: err });
        }
      )
      User.findOne({ _id: decode.id }).then(users => {
        if (users) res.status(200).json(users);
      });
    } else {
      res.send(err);
    }
  });

});

router.post("/register", (req, res) => {
  
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log("register")
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ success: false,message: "Email already exists." });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile
      });
      console.log("newUser", newUser)

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user =>
              res.json({
                success: true,
              })
            )
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } 

  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ success: false, message: "Email not found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };
        const token = jwt.sign(payload, secretOrKey, { expiresIn: 31556926 });
        return res
          .status(200)
          .json({
            success: true,
            token: token
          });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect" });
      }
    }).catch(e => console.log("error", e))
  });
});

module.exports = router;
