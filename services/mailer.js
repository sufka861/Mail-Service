const cron = require('node-cron');
const nodemailer = require('nodemailer');
const {schedule} = require("node-cron");
require('dotenv').config();
const {addToSentJason, addToFutureEmails, deleteFromFutureEmails} = require("../DAL/emailsDAL");


// let mailOptions = {
//     from: `dcs-growth ${process.env.EMAIL_ADDRESS_ZOHO}`,
//     to: ['sufkarmon2@gmail.com',],
//     cc: '',
//     bcc: '',
//     subject: 'Email from Node-App: A Test Message!',
//     html: '<h1>new mail check</h1>',
// };

let transporter = nodemailer.createTransport({
    //host: "smtp-mail.outlook.com",
    service: 'Zoho',
    //service: 'outlook',
    auth: {
        user: `${process.env.EMAIL_ADDRESS_ZOHO}`,
        pass: `${process.env.EMAIL_PASS}`,
    },
    secureConnection: false,
});

////****** SENDING EMAIL FUNCTION******
function sendMail(mailOptions) {
    transporter.sendMail(mailOptions, (error, info) => {
        Object.assign(mailOptions, {"from": process.env.EMAIL_ADDRESS_ZOHO});
        if (error) console.log(error);
        else
        {
            console.log('Email sent: ' + info.response);
            //CALL TO write to sentEmail json file
            addToSentJason(mailOptions);
        }
    });
}


function newMail(mailOptions, isScheduled = false, timeToSend = "") {
    if (isScheduled == true) {
        //$$$$$ BREAK DOWN TO WANTED TIME
        let [date, time]= timeToSend.split(',');
        let [hours, minutes, seconds] = time.split(':');
        let [day, month, year] = date.split('.');
        let wantedTime = `${seconds} ${minutes} ${hours} ${day} ${month} *`;

        cron.schedule(wantedTime, function () {
            console.log('---------------------');
            console.log('Running Cron Process schedule for: ' + timeToSend);
            //write to JSON of scheduled emails
            addToFutureEmails(mailOptions, timeToSend);
            // Delivering mail with sendMail method
            console.log(mailOptions);
            sendMail(mailOptions);
            //deleteFromFutureEmails();
        });
    } else {
        sendMail(mailOptions);
    }
}

module.exports = {
    newMail,
    //mailOptions
}
