const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const router = express.Router();
// Item model
const User = require('../../models/User');

// @route POST api/users
// @desc Register new users
// @access Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Mohon input required field' });
  }

  // check existing user
  User.findOne({ email: email }).then((user) => {
    if (user) return res.status(400).json({ msg: 'User sudah terdaftar' });

    const newUser = new User({
      name: name,
      email: email,
      password: password,
    });

    // create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser.save().then((user) => {
          // jwt sign token
          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            {
              expiresIn: 3600,
            },
            (err, token) => {
              if (err) throw err;

              res.json({
                token: token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            },
          );
        });
      });
    });
  });
});

module.exports = router;
