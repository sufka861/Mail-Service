const { newMail , sendMailAfterTime } = require("../services/mailer");
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
  } catch (err) {
    return errorHandler(req, res);
  }
}


// send email after 10 minite if user does not complete the registeration prosses
function sendEmailAftertime(req, res) {

  let mailDetails = {
      from: 'mohamadaboria116@gmail.com',
      to: 'mohamadaboria116@gmail.com',
      subject: 'Error Registraction',
      html:`<h1>sorry you  are not complete the registraction process</h1>`
  };

  let mailData;
  let isCompleted = false
  req
      .on('data', data => mailData = JSON.parse(data.toString()))
      .on('end', () => {
         
          sendMailAfterTime(mailDetails, isCompleted);
          res.send(`<h1>Send Email Successfully </h1>`);
      });
}


module.exports = {
  getEmails,
  getScheduledEmails,
  totalSentEmails,
  totalEmailsToSend,
  sendMail,
  sendEmailAftertime
};
