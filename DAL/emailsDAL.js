const {emailSent} = require("../DB/emailsSentSchema");
const {FutureEmail} = require("../DB/futureEmailsSchema");

async function addToSentJason(mailOptions) {
    if (mailOptions.timeToSend) delete mailOptions.timeToSend;
    if (mailOptions.id) delete mailOptions.id;

    const timeNow = {timeSent: new Date().toLocaleString()};
    const mailDetails = Object.assign(mailOptions, timeNow);
    const mailToSave = new emailSent(mailDetails);
    return await mailToSave.save();
}

//NOTICE - TimeToSend has to be a Date().toLocaleString() object
async function addToFutureEmails(mailOptions) {
    const mailToSave = new FutureEmail(mailOptions);
    return await mailToSave.save();
}

async function deleteFromFutureEmails(mailID) {
    return FutureEmail.deleteOne({id: mailID});
}

async function getAllSentEmails() {
    return emailSent.find({});
}

async function getAllFutureEmails() {
    return FutureEmail.find({});
}

async function getNumOfSentEmails() {
    return await emailSent.find({}).then((emails) => emails.length);
}

async function getNumOfEmailsToSend() {
    return await FutureEmail.find({}).then((emails) => emails.length);
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
