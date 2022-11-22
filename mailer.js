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

let mailOptions = {
    from: 'dcs-growth@outlook.com',
    to: 'sufkarmon2@gmail.com',
    cc: 'stavav1230@gmail.com',
    bcc: '',
    subject: 'Email from Node-App: A Test Message!',
    text: '',
    html: '<h1>hi there</h1>',
};

let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'dcs-growth@outlook.com',
        pass: 'Abc2022!',
    },
});

let wantedTime = '39 10 22 11 *';

cron.schedule(wantedTime, function () {
    console.log('---------------------');
    console.log('Running Cron Process');
    // Delivering mail with sendMail method
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log('Email sent: ' + info.response);
    });
});

// ////****** SENDING EMAIL WITHOUT SCHEDULER ******
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) console.log(error);
//     else console.log('Email sent: ' + info.response);
// });