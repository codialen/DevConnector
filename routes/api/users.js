const express = require('express');

// to user the express router, we need to create a variable called router & set that to express.Router();
const router = express.Router();

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('User route'));

module.exports = router;