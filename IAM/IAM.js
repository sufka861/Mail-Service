const {mailRouter} = require("../Routers/mailRouter");
// ^^^ TO BE DELETED WHEN USED BY THE IAM GROUP


//emailAddress : string
//emailSubject : string
//emailHtmlPATH : : object {path: './IAM/welcome.html'}
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

// API DOMAIN NEEDS TO BE CHANGED TO RENDER DOMAIN WHEN USED BY THE IAM GROUP
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

module.exports = {
    sendMail,
};

////EXAMPLE CALL TO SENDMAIL: *****************************
const emailAddress = "sufkarmon2@gmail.com"
const emailSubject = "Welcome!"
const emailHtmlPATH = {path: './IAM/welcome.html'}
sendMail(emailAddress, emailSubject, emailHtmlPATH);
//// ********************************************************
