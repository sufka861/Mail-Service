const http = require ('http');
const  port = 8080;

http.createServer((req,res) => {
    res.writeHead(200);

    if (req.url == `/templates`)
    {
        res.write(JSON.stringify({
            id : 1,
            name : `Pe'er`
        }));
    }


    res.end();
}).listen(port);