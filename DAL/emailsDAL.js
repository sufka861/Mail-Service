const path = require('node:path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { paths } = require('../DB/config');

function addToSentJason(mailOptions) {
  const emailsSent = require(path.join(process.cwd(), paths.emailsSentPath));
  // console.log(emailsSent);
  const numOfEmails = emailsSent.emails.length;
  console.log(mailOptions);
  const timeNow = { timeSent: new Date().toLocaleString() };

  const mailDetails = Object.assign(mailOptions, timeNow);
  emailsSent.emails.push(mailDetails);

  fs.writeFile(path.join(process.cwd(), paths.emailsSentPath), JSON.stringify(emailsSent), 'utf-8', (err) => {
    if (err) { throw err; } else { console.log('email saved to emailsSent.json'); }
  });
}

// NOTICE - TimeToSend has to be a Date().toLocaleString() object
function addToFutureEmails(mailOptions, timeToSend) {
  const emailsToSend = require(path.join(process.cwd(), paths.emailsToSendPath));
  const mailID = { id: uuidv4() };
  const timeObj = { timeToSend };
  const mailDetails = Object.assign(mailOptions, timeObj, mailID);
  emailsToSend.emails.push(mailDetails);
  fs.writeFile((path.join(process.cwd(), paths.emailsToSendPath)), JSON.stringify(emailsToSend), 'utf-8', (err) => {
    if (err) { throw err; } else { console.log('email saved to emailsToSend.json'); }
  });
}

function deleteFromFutureEmails(mailID) {
  const emailsToSend = require(path.join(process.cwd(), paths.emailsToSendPath));
  const indexOfEmail = emailsToSend.emails.findIndex(() => emailsToSend.emails.id == mailID);
  emailsToSend.emails.splice(indexOfEmail, 1);
  fs.writeFile(path.join(process.cwd(), paths.emailsToSendPath), JSON.stringify(emailsToSend), 'utf-8', (err) => {
    if (err) { throw err; } else { console.log('deleted email from emailsToSend.json'); }
  });
}

function getAllSentEmails() {
  const emailsSent = require(path.join(process.cwd(), paths.emailsSentPath));
  return (emailsSent);
}

function getAllFutureEmails() {
  const emailsToSend = require(`../${paths.emailsToSendPath}`);
  return (emailsToSend);
}

function getNumOfSentEmails() {
  const emailsSent = require(`../${paths.emailsSentPath}`);
  return (emailsSent.emails.length);
}

function getNumOfEmailsToSend() {
  const emailsToSend = require(`../${paths.emailsToSendPath}`);
  return (emailsToSend.emails.length);
}

module.exports = {
  addToSentJason,
  addToFutureEmails,
  deleteFromFutureEmails,
  getAllSentEmails,
  getAllFutureEmails,
  getNumOfSentEmails,
  getNumOfEmailsToSend,
};
