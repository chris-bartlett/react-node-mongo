const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        // create survey
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })), // split by comma and map to array of objects
            _user: req.user.id,
            dateSent: Date.now()
        });

        // send emails
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            // save survey
            await survey.save();

            // deduct credits
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        }
        catch (err) {
            res.status(422).send(err);
        }
    });

    app.get('/api/surveys/thanks', requireLogin, (req, res) => {
        res.send('Thanks for voting!');
    });
};
