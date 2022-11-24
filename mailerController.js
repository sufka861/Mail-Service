const cron = require("node-cron");

//const mailer = require("mailer");
//const {transporter} = require("./mailer");
//const {newMail} = require("./mailer");
//const {mailOptions} = require("./mailer");

const {addToSentJason} = require("./emailsDAL");
const {addToFutureEmails} = require("./emailsDAL");
const {deleteFromFutureEmails} = require("./emailsDAL");
const {getAllSentEmails} = require("./emailsDAL");
const {getAllFutureEmails} = require("./emailsDAL");
const {getNumOfSentEmails} = require("./emailsDAL");
const {getNumOfEmailsToSend} = require("./emailsDAL");


function GetEmails(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.writeHeader(200);
    console.log(JSON.stringify(getAllSentEmails()));
    res.end(JSON.stringify(getAllSentEmails()));
}

// function sendMail(req, res){
//     let newMailData;
//     req
//         .on('data', data => newMailData = JSON.parse(data.toString()))
//         .on('end', () => {
//
//             res.end('new Mail sent');
//         });
// }


module.exports = {
    GetEmails,

}
