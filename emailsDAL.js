const path = require(`node:path`)
const {paths} = require(`./config`);
const fs = require('fs');
const emailsSent = require(path.join(__dirname, paths.emailsSentPath));
const emailsToSend = require(path.join(__dirname, paths.emailsToSendPath));
const { v4: uuidv4 } = require('uuid');



function addToSentJason(mailOptions){
    let emailsSent = require(path.join(__dirname, paths.emailsSentPath));
    let numOfEmails = emailsSent.emails.length;
    console.log(numOfEmails);
    const timeNow = {timeSent: new Date().toLocaleString()};
    let mailDetails = Object.assign(mailOptions, timeNow);
    emailsSent.emails.push(mailDetails);

    fs.writeFile(path.join(__dirname, paths.emailsSentPath), JSON.stringify(emailsSent), "utf-8", (err)=>{
        if(err)
            throw err;
        else
            console.log("email saved to emailsSent.json");
    });
}

//NOTICE - TimeToSend has to be a Date().toLocaleString() object
function addToFutureEmails(mailOptions, timeToSend){
    let emailsToSend = require(path.join(__dirname, paths.emailsToSendPath));
    let mailID = {id: uuidv4()};
    let mailDetails = Object.assign(mailOptions, timeToSend, mailID);
    emailsToSend.emails.push(mailDetails);
    fs.writeFile(path.join(__dirname, paths.emailsToSendPath), JSON.stringify(emailsToSend), "utf-8", (err)=>{
        if(err)
            throw err;
        else
            console.log("email saved to emailsToSend.json");
    });
}


function deleteFromFutureEmails(mailID){
    let emailsToSend = require(path.join(__dirname, paths.emailsToSendPath));
    let indexOfEmail = emailsToSend.emails.findIndex(function(mailID) {
        return emailsToSend.emails.id == mailID;
    });
    emailsToSend.emails.splice(indexOfEmail, 1);
    fs.writeFile(path.join(__dirname, paths.emailsToSendPath), JSON.stringify(emailsToSend), "utf-8", (err)=>{
        if(err)
            throw err;
        else
            console.log("deleted email from emailsToSend.json");
    });
}

function getAllSentEmails(){
    const emailsSent = require(path.join(__dirname, paths.emailsSentPath));
    return(emailsSent);
}


function getAllFutureEmails(){
    const emailsToSend = require(path.join(__dirname, paths.emailsToSendPath));
    return(emailsToSend);
}

function getNumOfSentEmails(){
    const emailsSent = require(path.join(__dirname, paths.emailsSentPath));
    return(emailsSent.emails.length);
}

function getNumOfEmailsToSend(){
    const emailsToSend = require(path.join(__dirname, paths.emailsToSendPath));
    return(emailsToSend.emails.length);
}

module.exports = {
    addToSentJason,
    addToFutureEmails,
    deleteFromFutureEmails,
    getAllSentEmails,
    getAllFutureEmails,
    getNumOfSentEmails,
    getNumOfEmailsToSend,
};