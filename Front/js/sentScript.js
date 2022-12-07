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
      let to = [];
      let subject = [];
      let timeSent = [];
      const bool = 0;

      emails.forEach((email) => {
        console.log(email);
        email.to.forEach((address) => {
          console.log(address);
          to.push(address);
        });
        subject.push(email.subject);
        timeSent.push(email.timeSent);
      });

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
