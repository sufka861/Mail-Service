//create a server object: **************** JUST FOR DEBUG ************
let http = require('http');
const {sendMail} = require("./mailer");
const {mailOptions} = require("./mailer");

http.createServer(function (req, res) {
    res.write('Hello World!'); //write a response to the client
    sendMail(mailOptions);
    res.end(); //end the response
}).listen(3000); //the server object listens on port 8080
console.log("server running on port 3000");
// ********************************************************************

