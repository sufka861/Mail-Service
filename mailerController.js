const mailer = require("mailer");
const cron = require("node-cron");
const {transporter} = require("./mailer");

function sendMail(req, res){
    let newMailData;
    req
        .on('data', data => newMailData = JSON.parse(data.toString()))
        .on('end', () => {

            res.end('new Mail sent');
        });
}