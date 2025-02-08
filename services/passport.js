const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');


// passport requires serialize and deserialize user because it needs to store user id in session
// this is not google id, but mongoDB id for user in database colection
// after a user has signed in and we have their google id we use mongo's id to identify user
// we don't care about google's id after the intial sign up. 
passport.serializeUser((user, done) => {
    // user.id is the mongoDB id
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // find user by id - returns a promise
    User.findById(id)
        .then(user => done(null, user));
});

// setup passport 
// accessToken: used to access user data
// refreshToken: used to refresh accessToken
// profile: user data
passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' // after user grants permission, send user to this route
}, (accessToken, refreshToken, profile, done) => {
    // check if user already exists  - returns a promise
    User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if (existingUser) {
                // user already exists
                done(null, existingUser);
            } else {
                // create new user
                new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user));
            }
        });
}));