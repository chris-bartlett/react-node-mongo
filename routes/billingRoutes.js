const passport = require('passport');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {

    app.post('/api/stripe', requireLogin, async (req, res) => {
        // create charge to stripe and wait for response
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        // add credits to user
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
};