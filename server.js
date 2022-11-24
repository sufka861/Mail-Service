//create a server object: **************** JUST FOR DEBUG ************
let http = require('http');
const routes = require(`./mailRouter`);



// ************** DEMO SERVER FOR DEBUGGING *************************
http.createServer(routes).listen(3000);

    //newMail(mailOptions);

//res.write('Hello World!'); //write a response to the client
console.log("server running on port 3000");
// ********************************************************************

