//create a server object: **************** JUST FOR DEBUG ************
let http = require('http');
http.createServer(function (req, res) {
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
}).listen(3000); //the server object listens on port 8080
console.log("server runing on port 3000");
// ********************************************************************

const cron = require('node-cron');
const nodemailer = require('nodemailer');

let mailOptions = {
    from: 'dcs-growth@outlook.com',
    to: 'sufkarmon2@gmail.com',
    subject: 'Email from Node-App: A Test Message!',
    text: 'Some content to send',
};

let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'dcs-growth@outlook.com',
        pass: 'Abc2022!',
    },
});

transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
});