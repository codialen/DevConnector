const { response } = require('express');
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Finds the validation errors in this request and wraps them in an object
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body; // destructured array to pull out specific fields from the req.body

    try {
      let user = await User.findOne({ email }); // find user by email using Mongoose query's findOne

      if (user) {
        // if user exists. raise 400 response status & say that user already exists
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200', // set size string to 200
          r: 'pg', // pg rating
          d: 'mm', // gives default image/user icon if no gravatar exists
        }),
        { forceHttps: true }
      );

      user = new User({
        // create user isntance from the User Schema
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10); // generate a salt & specify to 10 rounds
      user.password = await bcrypt.hash(password, salt); // creates a hash & puts it in the user's password
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      // if something is wrong, it's a server error -> 500 status
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

// want to send data to this route: name, username, & pw to this route (req.body => is an
// object of data that's going to be sent to this route)
// in order for req.body to work, we need to initialize the middleware for the body-payser
// before we needed to actually install body-parser as a separate package & then initialize it,
// but now, it's included with express
