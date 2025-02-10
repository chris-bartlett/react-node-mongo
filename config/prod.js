const { stripePublishableKey } = require("./dev");

module.exports = {
    googleClientId: prod.env.GOOGLE_CLIENT_ID,
    googleClientSecret: prod.env.GOOGLE_CLIENT_SECRET,   
    mongoURI: prod.env.MONGO_URI,
    cookieKey: prod.env.COOKIE_KEY,
    stripePublishableKey: prod.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: prod.env.STRIPE_SECRET_KEY,
};
