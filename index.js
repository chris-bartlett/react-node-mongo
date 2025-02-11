const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); // User needs to come before passport
require('./models/Survey'); // User needs to come before passport
require('./services/passport');

// connect to mongoDB
mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json()); // parse body of post request

// set cookie session
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        keys: [keys.cookieKey]
    })
)
// tell passport to use cookies session
app.use(passport.initialize());
app.use(passport.session());

// pass app to authRoutes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// only run in production
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like main.js or main.css
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT);

