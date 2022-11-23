const fs = require('fs');
const emailsSent = require("./emailsSent.json");
const emailsToSend = require("./emailsToSend.json");
const { v4: uuidv4 } = require('uuid');

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

//NOTICE - TimeToSend has to be a Date().toLocaleString() object
function addToFutureEmails(mailOptions, timeToSend){
    let emailsToSend = require("./emailsToSend.json");
    let mailID = uuidv4();
    console.log(mailID);
    let mailDetails = Object.assign(mailOptions, timeToSend, mailID);
    emailsToSend.emails.push(mailDetails);
    fs.writeFile("./emailsToSend.json", JSON.stringify(emailsToSend), "utf-8", (err)=>{
        if(err)
            throw err;
        else
            console.log("email saved to emailsToSend.json");
    });
}


function deleteFromFutureEmails(mailID){
    let emailsToSend = require("./emailsToSend.json");
    let indexOfEmail = emailsToSend.emails.findIndex(function(mailID) {
        return emailsToSend.emails.id == mailID;
    });
    emailsToSend.emails.splice(indexOfEmail, 1);
    fs.writeFile("./emailsToSend.json", JSON.stringify(emailsToSend), "utf-8", (err)=>{
        if(err)
            throw err;
        else
            console.log("deleted email from emailsToSend.json");
    });
}

function getAllSentEmails(){
    const emailsSent = require("./emailsSent.json");
    return(emailsSent);
}


function getAllFutureEmails(){
    const emailsToSend = require("./emailsToSend.json");
    return(emailsToSend);
}

function getNumOfSentEmails(){
    const emailsSent = require("./emailsSent.json");
    return(emailsSent.emails.length);
}

function getNumOfEmailsToSend(){
    const emailsToSend = require("./emailsToSend.json");
    return(emailsToSend.emails.length);
}

module.exports = {
    addToSentJason,
    addToFutureEmails,
    getAllSentEmails,
    getAllFutureEmails,
    getNumOfSentEmails,
    getNumOfEmailsToSend,
};