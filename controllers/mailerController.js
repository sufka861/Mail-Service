const { newMail } = require("../services/mailer");
const mailService = require("../DAL/emailsDAL");
const { errorHandler } = require("./clientController");

function getEmails(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  try {
    res.json(mailService.getAllSentEmails());
  } catch (err) {
    return errorHandler(req, res);
  }
}

function getScheduledEmails(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  try {
    res.json(mailService.getAllFutureEmails());
  } catch (err) {
    return errorHandler(req, res);
  }
}

function totalSentEmails(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", " text/plain");
  res.status(200);
  try {
    res.send(`${mailService.getNumOfSentEmails()}`);
  } catch (err) {
    return errorHandler(req, res);
  }
}

function totalEmailsToSend(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", " text/plain");
  res.status(200);
  try {
    res.send(`${mailService.getNumOfEmailsToSend()}`);
  } catch (err) {
    return errorHandler(req, res);
  }
}

function sendMail(req, res) {
  try {
    const { mail, isScheduled, timeToSend } = req.body;
    newMail(mail, isScheduled, timeToSend);
    res.status(200);
    res.send("New Template Saved");
  } catch (err) {
    return errorHandler(req, res);
  }
}

module.exports = {
  getEmails,
  getScheduledEmails,
  totalSentEmails,
  totalEmailsToSend,
  sendMail,
};
