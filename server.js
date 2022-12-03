let http = require('http');
const routes = require(`./router`);

require('dotenv').config();
// ******** Http Server **************//
http.createServer(routes).listen(process.env.PORT);
console.log("server running on port 3000");


//************* Express Server ************//
// const {app} = require('./Routers/mainRouter');
// app.listen(process.env.PORT);