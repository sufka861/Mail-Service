const templatesService = require(`../services/templates`);
const { errorHandler } = require("./clientController");

// ************* Express way of handling Id passed in path params  ****************/
function getTemplateID(req) {
  return req.params.id;
}

async function getAllTemplates(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  try {
    res.json(await templatesService.templatesList());
  } catch (err) {
    console.log(err);
    return errorHandler(req, res);
  }
}

async function getNumOfTemplates(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", " text/plain");
  res.status(200);
  try {
    res.send(`${await templatesService.templatesList().length}`);
  } catch (err) {
    return errorHandler(req, res);
  }
}

async function getTemplate(req, res) {
  const templateID = getTemplateID(req);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  try {
    res.json(await templatesService.findTemplateByID(templateID));
  } catch (err) {
    return errorHandler(req, res);
  }
}

function createTemplateHandler(req, res) {
  try {
    templatesService.createTemplate(req.body);
    res.status(200);
    res.send("New Template Saved");
  } catch (err) {
    console.log(err);
    return errorHandler(req, res);
  }
}

function editTemplateHandler(req, res) {
  const templateID = getTemplateID(req);
  try {
    templatesService.editTemplate(templateID, req.body);
    res.status(200);
    res.send("Template Edited!");
  } catch (err) {
    return errorHandler(req, res);
  }
}

function deleteTemplateHandler(req, res) {
  try {
    console.log(req.body);
    templatesService.deleteTemplate(req.body.template_id);
    res.status(200);
    res.send("Template Deleted");
  } catch (err) {
    return errorHandler(req, res);
  }
}

module.exports = {
  getAllTemplates,
  getTemplate,
  createTemplateHandler,
  editTemplateHandler,
  deleteTemplateHandler,
  getNumOfTemplates,
};
