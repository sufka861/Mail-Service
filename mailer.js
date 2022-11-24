const cron = require('node-cron');
const nodemailer = require('nodemailer');
const {schedule} = require("node-cron");
require('dotenv').config();

const {addToSentJason} = require("./emailsDAL");
const {addToFutureEmails} = require("./emailsDAL");
const {deleteFromFutureEmails} = require("./emailsDAL");



let mailOptions = {
    from: 'dcs-growth dcs-growth@outlook.com',
    to: ['sufkarmon2@gmail.com',],
    cc: '',
    bcc: '',
    subject: 'Email from Node-App: A Test Message!',
    html: '<h1>blah blah blah</h1>',
};

let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASS}`,
    },
});

////****** SENDING EMAIL FUNCTION******
function sendMail(mailOptions) {
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) console.log(error);
    //     else console.log('Email sent: ' + info.response);
    // });

    //CALL TO write to sentEmail json file
    //addToSentJason(mailOptions);
    const timeToSend = {timeToSend: new Date().toLocaleString()};
    addToFutureEmails(mailOptions, timeToSend);
    //deleteFromFutureEmails("60580934-f9c3-4d3b-afc2-36dfd7117903");
}



//let isScheduled = false;

function newMail(mailOptions, isScheduled = false, scheduledTo = "") {
    if (isScheduled == true) {
        let minute = "", hour = "", date = "", month = "";
        let wantedTime = `${minute} ${hour} ${date} ${month} *`;

        cron.schedule(wantedTime, function () {
            console.log('---------------------');
            console.log('Running Cron Process');
            //write to JSON of scheduled emails
            addToFutureEmails(mailOptions, scheduledTo);
            // Delivering mail with sendMail method
            sendMail(mailOptions);
        });
    } else {
        sendMail(mailOptions);
    }
}

module.exports = {
    newMail,
    mailOptions
}
