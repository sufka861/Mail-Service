let http = require('http');
const routes = require(`./router`);
const {addToSentJason} = require("./DAL/emailsDAL");
require('dotenv').config();

http.createServer(routes).listen(3000);
console.log("server running on port 3000");
