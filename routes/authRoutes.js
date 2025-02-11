
const passport = require('passport');

module.exports = (app) => {
    // start oath flow
    // google string has internal identifier as GoogleStrategy
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // after user grants permission, send user to this route for callback route
    // get code from google
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/surveys'); // send to surveys after logging in
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user); // user added by passport
    });

    app.get('/api/logout', (req, res) => {
        req.logout(); // logout function added by passport
        res.redirect('/');  // redirect to home page - needs to be BEFORE send data or will send headers
    });

};


