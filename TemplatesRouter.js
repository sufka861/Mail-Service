const { errorHandler,
        getAllTemplates,
        getTemplate,
        createTemplateHandler,
        editTemplateHandler,
        deleteTemplateHandler} = require("./TemplatesControllers");

const {loadPage} = require("./clientController")

const {URL} = require(`url`);
const path = require('node:path');


const ROUTES = {
    GET: {
        '/templates': getAllTemplates,
        '/template/id': getTemplate,
    },
    POST:{
        '/template': createTemplateHandler
    },
    PUT:{
        '/template/id': editTemplateHandler

    },
    DELETE:{
        '/template':deleteTemplateHandler
    },
    FILES: {
        'script.js': loadPage,
        'style.css':loadPage,
        'Templates.html' :loadPage,
        'homepage.html': loadPage,
        }
}

module.exports = (req,res) =>{
    const url = new URL(req.url,`http://${req.headers.host}`);
    const ext =  path.extname(url.pathname);

    const handler =  ext ? loadPage : ROUTES[req.method][url.pathname];
    if(!handler){
        return errorHandler(req,res);
    }
    return handler(req,res);
}