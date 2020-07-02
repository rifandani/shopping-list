const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const router = express.Router();
// Item model
const User = require('../../models/User');

// @route POST api/auth
// @desc Auth the user
// @access Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Mohon input required field' });
  }

  // check existing user
  User.findOne({ email: email }).then((user) => {
    if (!user) return res.status(400).json({ msg: 'User tidak terdaftar' });

    // validate password with the database
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: 'Credential tidak valid' });

      // jwt sign token
      jwt.sign(
        { id: user.id },
        config.get('jwtSecret'),
        { expiresIn: 3600 },
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

// @route POST api/auth/auth
// @desc Auth the user
// @access Private
router.get('/user', auth, (req, res) => {
  const { id } = req.user;

  User.findById(id)
    .select('-password')
    .then((user) => res.json(user));
});

module.exports = router;
