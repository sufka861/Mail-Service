//create a server object: **************** JUST FOR DEBUG ************
let http = require('http');
http.createServer(function (req, res) {
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
}).listen(3000); //the server object listens on port 8080
console.log("server running on port 3000");
// ********************************************************************

const cron = require('node-cron');
const nodemailer = require('nodemailer');
const {schedule} = require("node-cron");

let mailOptions = {
    from: 'dcs-growth dcs-growth@outlook.com',
    to: ['sufkarmon2@gmail.com',],
    cc: '',
    bcc: '',
    subject: 'Email from Node-App: A Test Message!',
    html: '<h1>hi there</h1>',
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

    let timeNow = {timeSent: new Date().toLocaleString()};
    let mailDetails = Object.assign(mailOptions, timeNow);
    mailDetails = JSON.stringify(mailDetails);
    console.log(mailDetails);

}


let isScheduled = false;

if (isScheduled == true) {
    let minute = "", hour = "", date = "", month = "";
    let wantedTime = `${minute} ${hour} ${date} ${month} *`;

    cron.schedule(wantedTime, function () {
        console.log('---------------------');
        console.log('Running Cron Process');
        // Delivering mail with sendMail method
        sendMail(mailOptions);
    });
} else {
    sendMail(mailOptions);
}
