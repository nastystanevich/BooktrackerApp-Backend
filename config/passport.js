const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

require('dotenv').config();

passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    },
    function (username, password, done) {
        
        User.findOne({ username: username }, (err, user) => {
            console.log(user);
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            /*if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }*/
            return done(null, user);
        });
    }
    ));

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
};
passport.use(
    new JWTStrategy(opts, (jwtPayload, done) => {
        User.findOne({_id: jwtPayload._id}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }
        ); }));

module.exports = passport;



