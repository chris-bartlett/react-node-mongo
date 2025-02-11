const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();
    
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email(keys.sendGridEmail); // update with your email
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients); // format email addresses into an array

        this.addContent(this.body); // now we actually add the body to the email
        this.addClickTracking(); // add click tracking
        this.addRecipients(); // now we add the recipients to the email
    };

    // helper function to format email addresses into an array
    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    // helper function to add click tracking
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    // helper function to add recipients
    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }    

    // send email
    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST', 
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    };
}

module.exports = Mailer;