import { APIpaths } from "./APIpaths.js";

function createTable(toArray, subjectArray, timeSentArray, bool) {
  if (bool == 1) {
    var mytable =
      "<table class='table table-striped'> <thead> <tr> <th scope='row'>To</th> <th scope='row'>Subject</th><th scope='row'>timeToSend</th></tr></thead><tbody>";
  } else {
    var mytable =
      "<table class='table table-striped'> <thead> <tr> <th scope='row'>To</th> <th scope='row'>Subject</th><th scope='row'>timeSent</th></tr></thead><tbody>";
  }
  let num = subjectArray.length;
  for (let i = 0; i < num; i++) {
    console.log(subjectArray[i]);
    mytable += "<tr>";
    mytable += "<th scope='row'>" + toArray[i] + "</th>";
    mytable += "<td>" + subjectArray[i] + "</td>";
    mytable += "<td>" + timeSentArray[i] + "</td>";
    mytable += "</tr>";
  }
  mytable += "</tbody>";
  mytable += "</table>";
  document.getElementById("chart").innerHTML = mytable;
}

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
      console.log(to);
      console.log(subject);
      console.log(timeSent);
      createTable(to, subject, timeSent, bool);
    },
    error: function () {
      alert("Error - get - emails");
      top.location.href = "404.html";
    },
  });
}

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

function clickSend() {
  $(document).on("click", "#send", function (e) {
    e.preventDefault();
    alert("herrre");
    postSend();
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

function postSend() {
  const formData = {
    mail: {
      to: $("input[name=to]").val(),
      cc: $("input[name=cc]").val(),
      bcc: $("input[name=Bcc]").val(),
      subject: $("input[name=subject]").val(),
      html: $("textarea#email_message").val(),
    },
    isScheduled: $("input:checkbox:checked").val(),
    timeToSend: $("#date").val() + ", " + $("#time1").val(),
  };
  console.log(formData);
  $.ajax({
    url: APIpaths["sendMail"],
    type: "POST",
    data: JSON.stringify(formData),
    dataType: "json",
  })
    .done(function (data) {
      console.log(data);
      top.location.href = "homepage.html";
    })
    .fail(function (jqXHR, textStatus, message) {
      alert(`Error - Login - ${textStatus} ,  ${message}`);
      $("error-handler").html(JSON.stringify(message));
    });
}

function getAllTemplates() {
  $.ajax({
    url: "http://localhost:3000/templates",
    type: "GET",
    success: function (templates) {
      console.log(templates);
      let IdArray = [];
      let nameArray = [];
      let htmlArray = [];
      let templateBox =
        "<li className =`list-group-item list-group-item-primary` ";
      for (let i = 0; i < templates.length; i++) {
        let name = templates[i].name;
        templateBox +=
          "<li className =`list-group-item list-group-item-primary` " +
          "(<a onclick=getTemplateByID(" +
          `${[i]}` +
          ")> " +
          `${name}` +
          " </a></li>";

        nameArray.push(templates[i].name);
        IdArray.push(templates[i].template_id);
      }
      document.getElementById("templateBox").innerHTML = templateBox;

      console.log(nameArray);
      console.log(IdArray);
      console.log(htmlArray);
    },
    error: function () {
      alert("Error - get -  Templates");
    },
  });
}

function getTemplateByID(num) {
  console.log(num);
  let id = localStorage.getItem(num);
  let id2 = JSON.stringify(id);
  let id3 = JSON.parse(id2);
  let id4 = id.replace('"', "");
  let id5 = id4.replace('"', "");

  console.log("the id is", id5);

  $.ajax({
    url: "http://localhost:3000/template/id?id=" + id5,
    type: "GET",
    success: function (template) {
      console.log(template);
      console.log(template.name);
      console.log(template.html);
      let html = template.html;
      document.getElementById("email_message").innerHTML = html;
    },
    error: function () {
      console.log("Error - get -  TemplatesBYID");
    },
  });
}

function clickTemplate() {
  $(document).on("click", "#template", function (e) {
    e.preventDefault();
    alert("herrre");
  });
}

function createTemplateTable(nameArray, IdArray, htmlArray) {
  console.log(nameArray.length);
  for (let i = 0; i < nameArray.length; i++) {
    mytable += "<tr>";
    mytable +=
      "<th scope='row'>" +
      "<button onclick='getTemplateByID(" +
      `${[i]}` +
      ")'" +
      "class=button>Add Template</button>" +
      "<button onclick='DeleteByID(" +
      `${[i]}` +
      ")'" +
      "class=button>Delete Template</button>" +
      "<button onclick='edit()'" +
      "class=button>Edit Template</button>";
    mytable += "<th scope='row'>" + IdArray[i] + "</th>";
    mytable += "<td>" + nameArray[i] + "</td>";
    mytable += "<td>" + htmlArray[i] + "</td>";
  }
  mytable += "</tbody>";
  mytable += "</table>";
  document.getElementById("chart").innerHTML = mytable;
}

function getTotalnumTemplate() {
  $.ajax({
    url: "http://localhost:3000/templates/num",
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

document.addEventListener(
  "DOMContentLoaded",
  () => {
    document.getElementById("myCheck").onchange = toggleBilling;
  },
  false
);

function toggleBilling() {
  const billingItems = document.querySelectorAll('#billing input[type="time"]');
  const Item2 = document.querySelectorAll('#billing input[type="date"]');

  billingItems.forEach((item) => {
    item.disabled = !item.disabled;
  });
  Item2.forEach((item) => {
    item.disabled = !item.disabled;
  });
}
