import { createTable } from "./scripts.js";
import { APIpaths } from "./APIpaths.js";

window.onload = () => {
  getScheduledEmails();
  getTotaltoSendEmail();
};

function getScheduledEmails() {
  $.ajax({
    url: APIpaths["scheduledEmails"],
    type: "GET",
    success: function (emails) {
      console.log(emails);
      console.log(typeof emails.emails);
      console.log(emails.emails[0].from);

      let to = [];
      let subject = [];
      let timeToSend = [];
      const bool = 1;
      for (let i = 0; i < emails.emails.length; i++) {
        if (emails.emails[i].to.length >= 0) {
          for (let j = 0; j < emails.emails[i].to.length; j++) {
            to.push(emails.emails[i].to[j]);
          }
        }
        subject.push(emails.emails[i].subject);
        timeToSend.push(emails.emails[i].timeToSend);
      }
      console.log(to);
      console.log(subject);
      console.log(timeToSend);
      createTable(to, subject, timeToSend, bool);
    },
    error: function () {
      alert("Error - get -  scheduled emails");
      top.location.href = "404.html";
    },
  });
}

function getTotaltoSendEmail() {
  $.ajax({
    url: APIpaths["numScheduledEmails"],
    type: "GET",
    success: function (totalNum) {
      console.log(totalNum);
      document.getElementById("total").innerHTML = totalNum;
    },
    error: function () {
      alert("Error - get - emails");
      top.location.href = "404.html";
    },
  });
}
