const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Event = mongoose.model('Event');
const passport = require('passport');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');

router.get('/current', restoreUser, async (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  const dbUser = await User.findById({_id: req.user.id})
  return res.json({
    _id: req.user._id,
    username: req.user.username,
    fname: dbUser.fname,
    lastName: dbUser.lname
  });
});

router.get('/', async (req, res) => {
  const users = await User.find()
  return res.json(users)
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const events = await Event.find({ owner: req.params.id })
    return res.json({ user, events })
  } 
  catch (err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
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
    if (req.body.password.length < 6) {
      errors.password = "Password is too short. Must be at least 6 characters";
    }
    err.errors = errors;
    return next(err);
  }
  const newUser = new User({
    username: req.body.username,
    fname: req.body.fname,
    lname: req.body.lname,
    ownedEvents: []
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { username: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});


module.exports = router;
