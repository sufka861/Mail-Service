// $('#datetimepicker').data("DateTimePicker").FUNCTION()


function createTable(toArray,subjectArray,timeSentArray,bool){

    if (bool ==1) {
        var mytable = "<table class='table table-striped'> <thead> <tr> <th scope='row'>To</th> <th scope='row'>Subject</th><th scope='row'>timeToSend</th></tr></thead><tbody>";
    }
    else
    {
        var mytable = "<table class='table table-striped'> <thead> <tr> <th scope='row'>To</th> <th scope='row'>Subject</th><th scope='row'>timeSent</th></tr></thead><tbody>";

    }

    for (let i=0; i<subjectArray.length; i++) {
        console.log(subjectArray[i]);
        mytable += "<tr>";
        mytable += "<th scope='row'>" + toArray[i] + "</th>";
        mytable += "<td>" + subjectArray[i] + "</td>";
        mytable += "<td>" + timeSentArray[i] + "</td>";
        mytable+="</tr>";
    }
    mytable += "</tbody>";
    mytable += "</table>";
    document.getElementById("chart").innerHTML = mytable
}


function sentMailPage(){
    $( "tr" ).click(function() {
        window.location = shir
    });
}


function getSentEmail(){
    $.ajax({
        url: 'http://localhost:3000/emailsSent',
        type: 'GET',
        success: function(emails) {
            console.log(emails);
            console.log(typeof (emails.emails));
            console.log((emails.emails[0].from));

            let to = [];
            let subject = [];
            let timeSent = [];
            const bool = 0;

            for(let i =0; i<emails.emails.length; i++)
            {
                if(emails.emails[i].to.length>=0)
                {
                    for (let j=0; j<emails.emails[i].to.length; j++)
                    {
                        to.push(emails.emails[i].to[j]);
                    }
                }

                subject.push(emails.emails[i].subject);
                timeSent.push(emails.emails[i].timeSent);

            }
            console.log(to);
            console.log(subject);
            console.log(timeSent);
            createTable(to,subject,timeSent,bool
            )

        },
        error:function(){
            alert('Error - get - emails');
            top.location.href="404.html";
        }
    });
}

function getScheduledEmails(){
    $.ajax({
        url: 'http://localhost:3000/scheduledEmails',
        type: 'GET',
        success: function(emails) {
            console.log(emails);
            console.log(typeof (emails.emails));
            console.log((emails.emails[0].from));

            let to = [];
            let subject = [];
            let timeToSend = [];
            const bool = 1;
            for(let i =0; i<emails.emails.length; i++)
            {
                if(emails.emails[i].to.length>=0)
                {
                    for (let j=0; j<emails.emails[i].to.length; j++)
                    {
                        to.push(emails.emails[i].to[j]);
                    }
                }
                subject.push(emails.emails[i].subject);
                timeToSend.push(emails.emails[i].timeToSend);

            }
            console.log(to);
            console.log(subject);
            console.log(timeToSend);
            createTable(to,subject,timeToSend,bool)
        },
        error:function(){
            alert('Error - get -  scheduled emails');
            top.location.href="404.html";
        }
    });
}

function clickSend(){
    $(document).on('click', '#send', function(e){
        e.preventDefault();
        alert("herrre");
        postSend();

    });
}

function getTotalSentEmail(){
    $.ajax({
        url: 'http://localhost:3000/numOfSentEmails',
        type: 'GET',
        success: function(totalNum) {
            console.log(totalNum);
            // var total =
            //     <section id="total">
            //         <h5 >totalNum:
            //         </h5>
            //         <!--                                            id="total"-->
            //     </section> ;
            document.getElementById("total").innerHTML = total;


        },
        error:function(){
            alert('Error - get - emails');
            top.location.href="404.html";
        }
    });
}

function getTotaltoSendEmail(){
    $.ajax({
        url: 'http://localhost:3000/numOfEmailsToSend',
        type: 'GET',
        success: function(totalNum) {
            console.log(totalNum);
            // var total =
            //     <section id="total">
            //         <h5 >totalNum:
            //         </h5>
            //         <!--                                            id="total"-->
            //     </section> ;
            document.getElementById("total").innerHTML = total;


        },
        error:function(){
            alert('Error - get - emails');
            top.location.href="404.html";
        }
    });
}

function postSend(){
    const formData = {
        'to' : $('input[name=to]').val(),
        'cc': $('input[name=cc]').val(),
        'bcc': $('input[name=Bcc]').val(),
        'subject': $('input[name=subject]').val()
    };
    console.log(formData);
    $.ajax({
        url: 'http://localhost:3000/sendMail',
        type: 'POST',
        data:formData,
        // cache: false,
        // async:false,
        dataType : 'json'
    })
        .done(function(data) {
            console.log(data);
            // localStorage.setItem("User", formData.user_name);
            top.location.href="homepage.html"
        })
        .fail(function(jqXHR, textStatus, message){
            alert(`Error - Login - ${textStatus} ,  ${message}`);
            $('error-handler').html(JSON.stringify(message));
        });
}

function getAllTemplates(){
    $.ajax({
        url: 'http://localhost:3000/templates',
        type: 'GET',
        success: function(templates) {
            console.log(templates);
            let IdArray = [];
            let nameArray = [];
            let htmlArray = [];
            // let templatesArray =[];
            // templatesArray.push(templates);
            for(let i =0; i<templates.length; i++)
            {
                localStorage.setItem(i,JSON.stringify(templates[i].template_id));
                nameArray.push(templates[i].name);
                IdArray.push(templates[i].template_id);
                htmlArray.push(templates[i].html);

            }
            console.log(nameArray);
            console.log(IdArray);
            console.log(htmlArray);

            createTemplateTable(nameArray,IdArray,htmlArray)
        },
        error:function(){
            alert('Error - get -  Templates');
            // top.location.href="404.html";
        }
    });
}

function getTemplateByID(num){
    console.log(num);
    let id = localStorage.getItem(num);
    let id2 =JSON.stringify(id);
    let id3 = JSON.parse(id2);
    let id4 = id.replace('"','');
    let id5 = id4.replace('"','');

    console.log("the id is" ,id5);


    $.ajax({
        url: 'http://localhost:3000/template/id?id='+id5,
        type: 'GET',
        success: function(template) {
            console.log(template);
            console.log(template.name);
            console.log(template.html);
            let html = template.html;
            document.getElementById("email_message").innerHTML=html;

        },
        error:function(){
            console.log('Error - get -  TemplatesBYID');
            // top.location.href="404.html";
        }
    });
}


function DeleteByID(num){
    console.log(num);
    let id = localStorage.getItem(num);
    let id2 =JSON.stringify(id);
    let id3 = JSON.parse(id2);
    let id4 = id.replace('"','');
    let id5 = id4.replace('"','');

    console.log("the id is" ,id5);


    $.ajax({
        url: 'http://localhost:3000/template/',
        type: 'DELETE',
        success: function(template) {
            console.log(template);
            console.log(template.name);
            console.log(template.html);
            let html = template.html;
            document.getElementById("email_message").innerHTML=html;

        },
        error:function(){
            console.log('Error - DELETE -  TemplatesBYID');
            // top.location.href="404.html";
        }
    });
}

function createTemplateTable(nameArray,IdArray,htmlArray){
    var mytable = "<table class='table table-striped'> <thead> <tr> <th scope='row'>NUM</th> <th scope='row'>ID</th> <th scope='row'>Name</th><th scope='row'>Body</th></tr></thead><tbody>";


    // var mytable = "<table class='container bootdey'> <thead> <tr> <th scope='row'>Name</th></thead><tbody>";
    console.log(nameArray.length);
    for (let i=0; i<nameArray.length; i++) {
        mytable += "<tr>";

        mytable += "<th scope='row'>"+
            "<button onclick='getTemplateByID("+`${[i]}`+")'"+ "class=button>Add Template</button>"+
            "<button onclick='DeleteByID("+`${[i]}`+")'"+"class=button>Delete Template</button>"+
            "<button onclick='edit()'"+ "class=button>Edit Template</button>"
        {/* mytable += "<th scope='row'><div id=list-items><a href=#> Hindi </a><a href=#> English </a><a href=#> Spanish </a> <a href=#> Chinese </a> <a href=#> Japanese </a> </div><button id="+ `${i}`+">" + "</th>"; */}

        {/* // mytable += "<th scope='row'><button id="+ `${i}`+">" + "</th>"; */}
        mytable += "<th scope='row'>" + IdArray[i] + "</th>";
        mytable += "<td>" + nameArray[i] + "</td>";
        mytable += "<td>" + htmlArray[i] + "</td>";
        // mytable+="</tr>";
        // console.log(nameArray[i]);
        // mytable += "<tr>";
        // mytable += "<th scope='row'>" + nameArray[i] + "</th>";
        // mytable+="</tr>";
    }
    mytable += "</tbody>";
    mytable += "</table>";
    document.getElementById("chart").innerHTML = mytable

}

function clickTemplate(){
    $(document).on('click', '#template', function(e){
        e.preventDefault();
        alert("herrre");
    });
}






