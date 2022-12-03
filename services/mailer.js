const cron = require('node-cron');
const nodemailer = require('nodemailer');
const {schedule} = require("node-cron");
require('dotenv').config();
const {addToSentJason, addToFutureEmails, deleteFromFutureEmails} = require("../DAL/emailsDAL");


let transporter = nodemailer.createTransport({
     host: 'zohomail.com',
    // port: process.env.PORT,
    service: 'Zoho',
    //service: 'outlook',
    auth: {
        user: `${process.env.EMAIL_ADDRESS_ZOHO}`,
        pass: `${process.env.EMAIL_PASS}`,
    },
    secureConnection: false,
});

////****** SENDING EMAIL FUNCTION******
async function sendMail(mailOptions) {
    Object.assign(mailOptions, {"from": process.env.EMAIL_ADDRESS_ZOHO});
    console.log(mailOptions);
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else
        {
            console.log('Email sent: ' + info.response);
            //CALL TO write to sentEmail json file
            addToSentJason(mailOptions);
        }
    });

    // addToSentJason(mailOptions);

    //const timeToSend = {timeToSend: new Date().toLocaleString()};
    //deleteFromFutureEmails("60580934-f9c3-4d3b-afc2-36dfd7117903");
}


function newMail(mailOptions, isScheduled = false, scheduledTo = "") {
    if (isScheduled == true) {
        // BREAK DOWN TO WANTED TIME
        let minute = "", hour = "", date = "", month = "";
        let wantedTime = `${minute} ${hour} ${date} ${month} *`;

        cron.schedule(wantedTime, function () {
            console.log('---------------------');
            console.log('Running Cron Process');
            //write to JSON of scheduled emails
            addToFutureEmails(mailOptions, scheduledTo);
            // Delivering mail with sendMail method
            sendMail(mailOptions);
            //deleteFromFutureEmails();
        });
    } else {
        sendMail(mailOptions);
    }
}

module.exports = {
    newMail,
    // mailOptions
}
