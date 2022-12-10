const cron = require("node-cron");
const nodemailer = require("nodemailer");
const {schedule} = require("node-cron");
const {v4: uuidv4, validate: validId} = require("uuid");
require("dotenv").config();
const {
    addToSentJason,
    addToFutureEmails,
    deleteFromFutureEmails,
} = require("../DAL/emailsDAL");

let transporter = nodemailer.createTransport({
    host: "zohomail.com",
    service: "Zoho",
    auth: {
        user: `${process.env.EMAIL_ADDRESS_ZOHO}`,
        pass: `${process.env.EMAIL_PASS}`,
    },
    secureConnection: false,
});

async function sendMail(mailOptions) {
    Object.assign(mailOptions, {from: process.env.EMAIL_ADDRESS_ZOHO});
    await transporter.sendMail(mailOptions, async (error, info) => {
        if (error) console.log(error);
        else {
            console.log("Email sent: " + info.response);
            await addToSentJason(mailOptions);
        }
    });
}

async function newMail(mailOptions, isScheduled = "off", scheduledTo = "") {
    if (isScheduled == "on") {
        const dateTimeArr = scheduledTo.split(",");
        let dateStr = dateTimeArr[0];
        dateStr = dateStr.split("-");
        const month = dateStr[1];
        const day = dateStr[2];
        const timeStr = dateTimeArr[1];
        const timeArr = timeStr.split(":");
        const hour = timeArr[0];
        const minute = timeArr[1];
        let wantedTime = `${minute} ${hour} ${day} ${month} *`;
        const timeObj = {timeToSend: scheduledTo};
        Object.assign(mailOptions, timeObj, {id: uuidv4()});
        await addToFutureEmails(mailOptions);

        await cron.schedule(wantedTime, async function () {
            await sendMail(mailOptions).then(async () => {
                await deleteFromFutureEmails(mailOptions.id);
            });
        });
    } else {
        await sendMail(mailOptions);
    }
}

async function sendMailAfterTime(mailOptions, isCompleted) {
    if (isCompleted === false) {
        setTimeout(() => {
            sendMail(mailOptions)
        }, 600000)
    }
}

module.exports = {
    newMail,
    sendMailAfterTime,
};
