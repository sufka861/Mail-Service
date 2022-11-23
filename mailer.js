const cron = require('node-cron');
const nodemailer = require('nodemailer');
const {schedule} = require("node-cron");

const {addToSentJason} = require("./emailsDAL");
const {addToFutureEmails} = require("./emailsDAL");


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
        user: 'dcs-growth@outlook.com',
        pass: 'Abc2022!',
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
