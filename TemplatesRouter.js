const { errorHandler,
        getAllTemplates,
        getTemplate,
        createTemplateHandler,
        editTemplateHandler,
        deleteTemplateHandler} = require("./TemplatesControllers");
const {URL} = require(`url`);


const ROUTES = {
    GET: {
        '/templates': getAllTemplates,
        '/template/id': getTemplate
    },
    POST:{
        '/template': createTemplateHandler
    },
    PUT:{
        '/template/id': editTemplateHandler

    },
    DELETE:{
        '/template':deleteTemplateHandler
    }
}

module.exports = (req,res) =>{
    const url = new URL(req.url,`http://${req.headers.host}`);
    const handler = ROUTES[req.method][url.pathname];
    if(!handler){
        return errorHandler(req,res);
    }
    return handler(req,res);
}