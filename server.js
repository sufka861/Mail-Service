let http = require('http');
const routes = require(`./router`);

http.createServer(routes).listen(3000);
console.log("server running on port 3000");

