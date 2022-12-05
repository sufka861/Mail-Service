const {mailRouter} = require("../Routers/mailRouter");
const {errorHandler} = require("../controllers/clientController");


const data = {
    "mail": {
        "to": [
            "sufkarmon2@gmail.com"
        ],
        "cc": "",
        "bcc": "",
        "subject": "Welcome!",
        "html": {path: './IAM/welcome.html'},
    },
    "isScheduled": "off",
    "timeToSend": "",
}

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


