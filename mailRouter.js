const {getEmails, getScheduledEmails, totalSentEmails, totalEmailsToSend, sendMail} = require("./mailerController");
const {URL} = require(`url`);
const path = require('node:path');

const ROUTES = {
    GET: {
        '/emailsSent': getEmails,
        '/scheduledEmails': getScheduledEmails,
        '/numOfSentEmails': totalSentEmails,
        '/numOfEmailsToSend': totalEmailsToSend,
    },
    POST: {
        '/sendMail': sendMail,   //how to send the mailOptions
    }
}



module.exports = (req,res) =>{
    const url = new URL(req.url,`http://${req.headers.host}`);
    const ext =  path.extname(url.pathname);
    const handler = ROUTES[req.method][url.pathname];
    //const handler =  ext ? loadPage : ROUTES[req.method][url.pathname];
    if(!handler){
        //return errorHandler(req,res);
    }
    return handler(req,res);
}