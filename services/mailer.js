const cron = require("node-cron");
const nodemailer = require("nodemailer");
const { schedule } = require("node-cron");
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

////****** SENDING EMAIL FUNCTION******
async function sendMail(mailOptions) {
  Object.assign(mailOptions, { from: process.env.EMAIL_ADDRESS_ZOHO });
  console.log(mailOptions);
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else {
      console.log("Email sent: " + info.response);
      //CALL TO write to sentEmail json file
      addToSentJason(mailOptions);
    }
  });
}

function newMail(mailOptions, isScheduled = "off", scheduledTo = "") {
  if (isScheduled == "on") {
    // BREAK DOWN TO WANTED TIME
    const dateTimeArr = scheduledTo.split(",");
    let dateStr = dateTimeArr[0];
    dateStr = dateStr.split("-");
    const month = dateStr[1];
    const day = dateStr[2];
    // const date = new Date(scheduledTo);
    // const day = date.getDay();
    // const month = date.getMonth();

    const timeStr = dateTimeArr[1];
    const timeArr = timeStr.split(":");
    const hour = timeArr[0];
    const minute = timeArr[1];
    console.log(day, month, hour, minute);
    let wantedTime = `${minute} ${hour} ${day} ${month} *`;

    cron.schedule(wantedTime, function () {
      console.log("---------------------");
      console.log("Running Cron Process");
      //write to JSON of scheduled emails
      addToFutureEmails(mailOptions, scheduledTo);
      // Delivering mail with sendMail method
      sendMail(mailOptions);
      //deleteFromFutureEmails();
    });
  } else {
    sendMail(mailOptions);
  }
}

module.exports = {
  newMail,
  // mailOptions
};
