const express = require('express');
const mailController = require('../controllers/mailerController');
const mailRouter = new express.Router();

// ************** GET method routing ********************* //
mailRouter.get('/emailsSent', mailController.getEmails);
mailRouter.get('/scheduledEmails', mailController.getScheduledEmails);
mailRouter.get('/numOfSentEmails', mailController.totalSentEmails);
mailRouter.get('/numOfEmailsToSend', mailController.totalEmailsToSend);



// ************** POST method routing ********************* //

mailRouter.post('/sendMail', mailController.sendMail);

module.exports = {
    mailRouter
}
