const {events, templateEvents, templatesList, findTemplateByID} = require(`../services/templates`)
//const path = require(`node:path`);
const {URL} = require(`url`);

// ************* HTTP way of handling id passed in query string ******************/
// getTemplateID = (req) => {
//     return new URL(req.url, `http://${req.headers.host}`)
//         .searchParams.get('id');
// }

// ************* Express way of handling Id passed in path params  ****************/
getTemplateID = (req) => {
    return new req.params.id;
}



function getAllTemplates(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.writeHeader(200);
    res.end(JSON.stringify(templatesList()));
}

function getNumOfTemplates(req, res)
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain');
    res.writeHeader(200);
    res.end(JSON.stringify(templatesList()).length);

}

function getTemplate(req, res) {
    const templateID = getTemplateID(req);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.writeHeader(200);
    res.end(JSON.stringify(findTemplateByID(templateID)));
}

function createTemplateHandler(req, res) {
    let newTemplateData;
    req
        .on(`data`, data => newTemplateData = JSON.parse(data.toString()))
        .on(`end`, () => {
            templateEvents.emit(events.CREATE, newTemplateData);
            res.end(`New Template Saved!`);
        });
}

function editTemplateHandler(req, res) {
    const templateID = getTemplateID(req);
    let editedTemplate;
    req
        .on(`data`, data => editedTemplate = JSON.parse(data.toString()))
        .on(`end`, () => {
            templateEvents.emit(events.EDIT, templateID, editedTemplate);
            res.end(`Templated has been successfully edited`);
        });

}

function deleteTemplateHandler(req, res) {
    let templateID;
    req
        .on(`data`, data => templateID = JSON.parse(data.toString()).template_id)
        .on(`end`, () => {
            templateEvents.emit(events.DELETE, templateID);
            res.end(`Template has been deleted`);
        });

}

module.exports = {
    getAllTemplates,
    getTemplate,
    createTemplateHandler,
    editTemplateHandler,
    deleteTemplateHandler,
    getNumOfTemplates

}
