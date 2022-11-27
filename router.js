const {
    getEmails,
    getScheduledEmails,
    totalSentEmails,
    totalEmailsToSend,
    sendMail
} = require("./controllers/mailerController");
const {
    getAllTemplates,
    getTemplate,
    createTemplateHandler,
    editTemplateHandler,
    deleteTemplateHandler
} = require("./controllers/templatesControllers");
const {errorHandler} = require("./controllers/clientController");
const {loadPage} = require("./controllers/clientController");
const {URL} = require(`url`);
const path = require('node:path');

const ROUTES = {
    GET: {
        '/emailsSent': getEmails,
        '/scheduledEmails': getScheduledEmails,
        '/numOfSentEmails': totalSentEmails,
        '/numOfEmailsToSend': totalEmailsToSend,
        '/templates': getAllTemplates,
        '/template/id': getTemplate,
    },
    POST: {
        '/sendMail': sendMail,
        '/template': createTemplateHandler

    },
    PUT: {
        '/template/id': editTemplateHandler

    },
    DELETE: {
        '/template': deleteTemplateHandler
    }
}


module.exports = (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const ext = path.extname(url.pathname);
    const handler = ext ? loadPage : ROUTES[req.method][url.pathname];
    if (!handler) {
        return errorHandler(req, res);
    }
    return handler(req, res);
}