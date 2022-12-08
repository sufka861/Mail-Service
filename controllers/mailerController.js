const { newMail } = require("../services/mailer");
const mailService = require("../DAL/emailsDAL");
const { errorHandler } = require("./clientController");

async function getEmails(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  try {
    res.json(await mailService.getAllSentEmails());
  } catch (err) {
    return errorHandler(req, res);
  }
}

async function getScheduledEmails(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  try {
    res.json(await mailService.getAllFutureEmails());
  } catch (err) {
    return errorHandler(req, res);
  }
}

async function totalSentEmails(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", " text/plain");
  res.status(200);
  try {
    res.send(`${await mailService.getNumOfSentEmails()}`);
  } catch (err) {
    return errorHandler(req, res);
  }
}

async function totalEmailsToSend(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", " text/plain");
  res.status(200);
  try {
    res.send(`${await mailService.getNumOfEmailsToSend()}`);
  } catch (err) {
    return errorHandler(req, res);
  }
}

async function sendMail(req, res) {
  try {
    const { mail, isScheduled, timeToSend } = req.body;
    await newMail(mail, isScheduled, timeToSend);
    res.status(200);
  } catch (err) {
    return errorHandler(req, res);
  }
}

async function welcomeHTML(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/html");
  res.status(200);
  try {
    res.sendFile("../IAM/welcome.html");
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
  welcomeHTML,
};
