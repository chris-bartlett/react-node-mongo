const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); // User needs to come before passport
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

const PORT = process.env.PORT || 4000;
app.listen(PORT);