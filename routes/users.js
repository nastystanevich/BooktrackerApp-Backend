const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', (req, res) => {
    console.log(req);
    User.create({
        username: req.body.username,
        password: req.body.password,
    }).then(user => res.json(user));
});

module.exports = router;