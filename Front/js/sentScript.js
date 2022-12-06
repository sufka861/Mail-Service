import { createTable } from "./scripts.js";
import { APIpaths } from "./APIpaths.js";

window.onload = () => {
  getSentEmail();
  getTotalSentEmail();
};

function getSentEmail() {
  $.ajax({
    url: APIpaths["emailsSent"],
    type: "GET",
    success: function (emails) {
      console.log(emails);
      console.log(typeof emails.emails);
      console.log(emails.emails[0].from);

      let to = [];
      let subject = [];
      let timeSent = [];
      const bool = 0;

      for (let i = 0; i < emails.emails.length; i++) {
        if (emails.emails[i].to.length >= 0) {
          for (let j = 0; j < emails.emails[i].to.length; j++) {
            to.push(emails.emails[i].to[j]);
          }
        }

        subject.push(emails.emails[i].subject);
        timeSent.push(emails.emails[i].timeSent);
      }
      createTable(to, subject, timeSent, bool);
    },
    error: function () {
      alert("Error - get - emails");
      top.location.href = "404.html";
    },
  });
}

function getTotalSentEmail() {
  $.ajax({
    url: APIpaths["numSentEmails"],
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
