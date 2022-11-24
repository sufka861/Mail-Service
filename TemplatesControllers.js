const {events, templateEvents, templatesList, findTemplateByID} = require(`./templates`)
const path = require(`node:path`);
const {URL} = require(`url`);

function errorHandler (req, res){
    res.writeHead(404);
    res.write(`Bad request`);
    res.end();
}

getTemplateID = (req)=>{
    return new URL(req.url ,`http://${req.headers.host}`)
                .searchParams.get('id');
}

function getAllTemplates(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.writeHeader(200);
    res.end(JSON.stringify(templatesList()));
}

function getTemplate(req,res){
    const templateID = getTemplateID(req);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.writeHeader(200);
    res.end(JSON.stringify(findTemplateByID(templateID)));
}
function createTemplateHandler(req,res) {
    let newTemplateData;
    req
        .on(`data`, data => newTemplateData = JSON.parse(data.toString()))
        .on(`end`, () => {
            templateEvents.emit(events.CREATE, newTemplateData);
            res.end(`New Template Saved!`);
        });
}
  function   editTemplateHandler(req,res){
      const templateID = getTemplateID(req);
      let editedTemplate;
      req
          .on(`data`, data => editedTemplate =JSON.parse(data.toString()))
          .on(`end`, () =>{
              templateEvents.emit(events.EDIT, templateID, editedTemplate);
              res.end(`Templated has been successfully edited`);
          });

}
function deleteTemplateHandler(req,res) {
    let templateID;
    req
        .on(`data`, data => templateID =JSON.parse(data.toString()).template_id)
        .on(`end`, () =>{
            templateEvents.emit(events.DELETE, templateID);
            res.end(`Template has been deleted`);
        });

}
module.exports = {
    errorHandler,
    getAllTemplates,
    getTemplate,
    createTemplateHandler,
    editTemplateHandler,
    deleteTemplateHandler,

}
