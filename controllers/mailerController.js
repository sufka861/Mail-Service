const cron = require("node-cron");
const {newMail} = require("../services/mailer");
const {getAllSentEmails, getAllFutureEmails, getNumOfSentEmails, getNumOfEmailsToSend} = require("../DAL/emailsDAL");

function getEmails(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.writeHeader(200);
    console.log(JSON.stringify(getAllSentEmails()));
    res.end(JSON.stringify(getAllSentEmails()));
}

function getScheduledEmails(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.writeHeader(200);
    console.log(JSON.stringify(getAllFutureEmails()));
    res.end(JSON.stringify(getAllFutureEmails()));
}

function totalSentEmails(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', ' text/plain');
    res.writeHeader(200);
    console.log(`num of sent emails: ${getNumOfSentEmails()}`);
    res.end(`${getNumOfSentEmails()}`);
}

function totalEmailsToSend(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', ' text/plain');
    res.writeHeader(200);
    console.log(`num of emails to send: ${getNumOfEmailsToSend()}`);
    res.end(`${getNumOfEmailsToSend()}`);
}

function sendMail(req, res) {
    //console.log(req.url);
    let mailData;
    req
        .on('data', data => mailData = JSON.parse(data.toString()))
        .on('end', () => {
            const {mail, isScheduled = false, timeToSend = ""} = mailData;
            newMail(mail, isScheduled, timeToSend);
            res.end();
        });
}


module.exports = {
    getEmails,
    getScheduledEmails,
    totalSentEmails,
    totalEmailsToSend,
    sendMail,
}
