const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
require('dotenv').config();

router.post('/login', (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, message) => {
        if (err || !user) {
            return res.status(400).json({
                err: err,
                message: message,
                user: user,
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY);
            return res.json({
                token,
            });
        });
    }) (req, res);

});

router.post('/signup', (req, res) => {
    User.findOne({username: req.body.username})
        .then((user) => {
            if (user) {
                return res.status(400).json('The username is already taken.');
            }

            const newUser = new User({
                username: req.body.username,
                password: req.body.password,
            });
            newUser.save();

            req.login(newUser, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }

                const token = jwt.sign(newUser.toJSON(), process.env.SECRET_KEY);
                return res.json({
                    token,
                });
            });
        })
});

module.exports = router;