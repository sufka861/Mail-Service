const {mailRouter} = require("../Routers/mailRouter");
// const {newMail} = require("../services/mailer");
const {errorHandler} = require("../controllers/clientController");
const fs = require('fs/promises');


async function readHTML(HTMLRoute) {
    try {
        const data = await fs.readFile(HTMLRoute, {encoding: 'utf8'});
        return (data);
    } catch (err) {
        console.log(err);
    }
}

HTMLRoute = './welcome.html';
const HTMLContent = readHTML(HTMLRoute);


const data = {
    "mail": {
        "to": [
            "sufkarmon2@gmail.com"
        ],
        "cc": "",
        "bcc": "",
        "subject": "Welcome!",
        "html": "<h1>hello welcome</h1>"
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
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });


