const mongoose = require('mongoose');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
    // route to get all surveys
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id }).select({
          recipients: false,
        });
    
        res.send(surveys);
      });

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

    // route to handle user feedback with surveryId and yes or no answer
    app.get('/api/surveys/:surveyId/:choice', requireLogin, (req, res) => {
        res.send('Thanks for voting!');
    });

    // app.post('/api/surveys/webhooks', (req, res) => {
    //     const p = new Path('/api/surveys/:surveyId/:choice');

    //     _.chain(req.body)
    //         .map(({ url, email }) => {
    //             const match = p.test(new URL(url).pathname);
    //             if (match) {
    //                 return { email, surveyId: match.surveyId, choice: match.choice };
    //             }
    //         })
    //         .compact()
    //         .uniqBy('email', 'surveyId')
    //         .each(({ surveyId, email, choice }) => {    
    //             Survey.updateOne({
    //                 _id: surveyId,
    //                 recipients: {
    //                     $elemMatch: { email: email, responded: false }
    //                 }
    //             }, {
    //                 $inc: { [choice]: 1 },
    //                 $set: { 'recipients.$.responded': true },
    //                 lastResponded: new Date()
    //             }).exec();
    //         })
    //         .value();

    //     res.send({});
    // });

    app.post("/api/surveys/webhooks", (req, res) => {
        const p = new Path("/api/surveys/:surveyId/:choice");
        _.chain(req.body)
          .map((item) => {
            const email = item.recipient;
            const url = item.url;
            if (url) {
              const match = p.test(new URL(url).pathname);
              if (match) {
                return { email, surveyId: match.surveyId, choice: match.choice };
              }
            }
          })
          .compact()
          .uniqBy("email", "surveyId")
          .each(({ surveyId, email, choice }) => {
            Survey.updateOne(
              {
                _id: surveyId,
                recipients: {
                  $elemMatch: { email: email, responded: false },
                },
              },
              {
                $inc: { [choice]: 1 },
                $set: { "recipients.$.responded": true },
                lastResponded: new Date(),
              }
            ).exec();
          })
          .value();
     
        res.send({});
      });    
};
