const {mailRouter} = require("../Routers/mailRouter");
const {errorHandler} = require("../controllers/clientController");


function sendMail(emailAddress, emailSubject, emailHtmlPATH) {
    //DYNAMIC LOAD DATA OF EMAIL TO SEND
    const userEmail = emailAddress;
    const subject = emailSubject;
    const htmlPATH = emailHtmlPATH
    const data = {
        "mail": {
            "to": [
                userEmail
            ],
            "cc": "",
            "bcc": "",
            "subject": subject,
            "html": htmlPATH,
        },
        "isScheduled": "off",
        "timeToSend": "",
    }

//FETCH FUNCTION NEEDS TO BE TRIGGERED BY REGISTRATION
    fetch('http://localhost:3000/api/mail/sendMail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success: Email was sent');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const EventEmitter = require('events');
var eventEmitter = new EventEmitter();
eventEmitter.on('register', sendMail);

// Triggering myEvent
eventEmitter.emit('register', "sufkarmon2@gmail.com", "Welcome!", {path: './IAM/welcome.html'});

