const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/users"
  });
});

router.post('/register', async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.username 
  });
  if (user) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }
  const newUser = new User({
    username: req.body.username,
    fname: req.body.fname,
    lname: req.body.lname
  });
  console.log("this is newUser:",newUser)
  console.log("newUser",newUser.username)
  console.log("kenny")
  bcrypt.genSalt(10, (err, salt) => {
    console.log("kenneth")
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        console.log("kennethy")
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json({ user });
      }
      catch(err) {
        next(err);
      }
    })
  });
  });


module.exports = router;
