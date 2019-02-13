const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

const authRoute = require('./auth');
const userRoutes = require('./users');
const bookRoutes = require('./books');
const commentRoutes = require('./comments');

router.use('/auth', authRoute);
router.use('/comment', passport.authenticate('jwt', {session: false}), commentRoutes);
router.use('/user', passport.authenticate('jwt', {session: false}), userRoutes);
router.use('/books', bookRoutes);

module.exports = router;