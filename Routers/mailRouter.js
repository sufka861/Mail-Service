const express = require("express");
const mailController = require("../controllers/mailerController");
const mailRouter = new express.Router();

mailRouter.get("/emailsSent", mailController.getEmails);
mailRouter.get("/scheduledEmails", mailController.getScheduledEmails);
mailRouter.get("/numOfSentEmails", mailController.totalSentEmails);
mailRouter.get("/numOfEmailsToSend", mailController.totalEmailsToSend);

mailRouter.post("/sendMail", mailController.sendMail);
mailRouter.post("/sendEmailAfterTime", mailController.timedOutRegisterMail);

module.exports = {
  mailRouter,
};
