
const passport = require('passport');

module.exports = (app) => {
    // start oath flow
    // google string has internal identifier as GoogleStrategy
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // after user grants permission, send user to this route for callback route
    // get code from google
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/current_user', (req, res) => {
        res.send(req.user); // user added by passport
    });

    app.get('/api/logout', (req, res) => {
        req.logout(); // added by passport
        res.send(req.user); // user added by passport but should be empty
    });
};


