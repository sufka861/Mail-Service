import { APIpaths } from "./APIpaths.js";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    clickSend();
    document.getElementById("myCheck").onchange = toggleBilling;
  },
  false
);

function clickSend() {
  $(document).on("click", "#send", function (e) {
    e.preventDefault();
    alert("herrre");
    postSend();
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
  $.ajax({
    url: APIpaths["sendMail"],
    type: "POST",
    data: formData,
    dataType: "json",
  })
    .done(function (data) {
      top.location.href = "homepage.html";
    })
    .fail(function (jqXHR, textStatus, message) {
      alert(`Error - Login - ${textStatus} ,  ${message}`);
      $("error-handler").html(JSON.stringify(message));
    });
}

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

export function createTable(toArray, subjectArray, timeSentArray, bool) {
  if (bool == 1) {
    var mytable =
      "<table class='table table-striped'> <thead> <tr> <th scope='row'>To</th> <th scope='row'>Subject</th><th scope='row'>timeToSend</th></tr></thead><tbody>";
  } else {
    var mytable =
      "<table class='table table-striped'> <thead> <tr> <th scope='row'>To</th> <th scope='row'>Subject</th><th scope='row'>timeSent</th></tr></thead><tbody>";
  }
  let num = subjectArray.length;
  for (let i = 0; i < num; i++) {
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

/*async function getAllTemplates() {
  $.ajax({
    url: 'http://localhost:3000/templates',
    type: 'GET',
    success: function (templates){
      console.log(templates);
      let IdArray = [];
      let nameArray = [];
      let htmlArray = [];
      let templateBox = "<li className =`list-group-item list-group-item-primary` ";
      for (let i = 0; i < templates.length; i++) {
        let name = templates[i].name;
        templateBox+= '<li className =`list-group-item list-group-item-primary` '+'(<a onclick=getTemplateByID('+`${[i]}`+')> '+ `${name}` +' </a></li>';

        nameArray.push(templates[i].name);
        IdArray.push(templates[i].template_id);

      }
      document.getElementById("templateBox").innerHTML = templateBox;

      console.log(nameArray);
      console.log(IdArray);
      console.log(htmlArray);
    },
    error: function () {
      alert('Error - get -  Templates');
    }
  });
}
*/


async function getAllTemplates2() {
  const res = await fetch(APIpaths["allTemplates"], {
    method: "GET",
    mode: `cors`,
    headers: { Accept: `application/json` },
  });
  const data = await res.json();
  data.forEach(function (obj) {
    let templateBox = "<li className =`list-group-item list-group-item-primary` ";
    let IdArray = [];
    let nameArray = [];
    let htmlArray = [];
    for (let i = 0; i < data.length; i++) {
      let name = data[i].name;
      templateBox+= '<li className =`list-group-item list-group-item-primary` '+'(<a onclick=getTemplateByID('+`${[i]}`+')> '+ `${name}` +' </a></li>';

      nameArray.push(data[i].name);
      IdArray.push(data[i].template_id);

    }
    document.getElementById("templateBox").innerHTML = templateBox;
    console.log(nameArray);
    console.log(IdArray);
    console.log(htmlArray);
  });
}



function clickTemplate() {
  $(document).on('click', '#template', function (e) {
    e.preventDefault();
    alert("herrre");
  });
}
