const fs = require('fs');
const emailsSent = require("./emailsSent.json");


function addToSentJason(mailOptions){
    let emailsSent = require("./emailsSent.json");
    let numOfEmails = emailsSent.emails.length;
    console.log(numOfEmails);
    const timeNow = {timeSent: new Date().toLocaleString()};
    let mailDetails = Object.assign(mailOptions, timeNow);
    emailsSent.emails.push(mailDetails);

    fs.writeFile("./emailsSent.json", JSON.stringify(emailsSent), "utf-8", (err)=>{
        if(err)
            throw err;
        else
            console.log("email saved to emailsSent.json");
    });
}


function addToFutureEmails(mailOptions, timeToSend){

}

function deleteFromFutureEmails(){

}

function getAllSentEmails(){
    const emailsSent = require("./emailsSent.json");
    return(emailsSent);
}


function getAllFutureEmails(){
    const emailsToSend = require("./emailsToSend.json");
    return(emailsToSend);
}

module.exports = {
    addToSentJason,
    addToFutureEmails,
    getAllSentEmails,
    getAllFutureEmails,
};