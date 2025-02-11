const { stripePublishableKey } = require("./dev");

module.exports = {
    googleClientId: prod.env.GOOGLE_CLIENT_ID,
    googleClientSecret: prod.env.GOOGLE_CLIENT_SECRET,   
    mongoURI: prod.env.MONGO_URI,
    cookieKey: prod.env.COOKIE_KEY,
    stripePublishableKey: prod.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: prod.env.STRIPE_SECRET_KEY,
    sendGridKey: prod.env.SEND_GRID_KEY,
    redirectDomain: prod.env.REDIRECT_DOMAIN,
    sendGridEmail: prod.env.SEND_GRID_EMAIL
};
