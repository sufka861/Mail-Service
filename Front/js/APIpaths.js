require('dotenv').config();
const domain = `http://localhost:${process.env.PORT}`

module.exports = APIpaths = {
    HTTP: {
        emailsSent : domain + '/emailsSent',
        scheduledEmails: domain + '/scheduledEmails',
        numSentEmails: domain + '/numOfSentEmails',
        numScheduledEmails: domain + '/numOfEmailsToSend',
        allTemplates : domain + '/templates',
        templateById: domain + '/template/id',
        sendMail: domain + '/sendMail',
        creatTemplate: domain + '/template',
        editTemplate: domain + '/template/id',
        deleteTemplate: domain +  '/template'
    }
};


