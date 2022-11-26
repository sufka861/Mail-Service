const {URL} = require('url');
const fs = require('fs');

function  loadPage (req, res) {
    const pathName = new URL(req.url,`http://${req.headers.host}`).pathname;
    res.writeHead(200);
    fs.createReadStream((__dirname+ '/Front' + pathName)).pipe(res);
}
module.exports = {
    loadPage
}
