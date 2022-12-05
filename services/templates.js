const { readTemplates, writeTemplates } = require(`../DAL/templatesDAL`);
const eventsEmitter = require("events");
const { v4: uuidv4, validate: validId } = require("uuid");

const events = {
  CREATE: "template_create",
  DELETE: "template_delete",
  EDIT: `template_edit`,
};

const createTemplateObj = (name, creator, date, html) => {
  return {
    template_id: uuidv4(),
    name: name,
    creator: creator,
    date: date,
    html: html,
  };
};

function createTemplate(data) {
  const { name, creator, html } = data;
  const template = createTemplateObj(
    name,
    creator,
    new Date().toLocaleString(),
    html
  );
  const templatesFile = readTemplates();
  const updatedTemplateFile = {
    templates: [...templatesFile, template],
  };
  writeTemplates(updatedTemplateFile);
}

function editTemplate(templateID, data) {
  const { name = "", creator = "", html = "" } = data;
  const templates = readTemplates();
  templates.forEach(function (obj) {
    if (obj.template_id == templateID) {
      if (name) obj.name = name;
      if (creator) obj.creator = creator;
      if (html) obj.html = html;
    }
    obj.date = new Date().toLocaleString();
  });

  writeTemplates({ templates: [...templates] });
}

function deleteTemplate(templateId) {
  console.log(templateId);
  const templates = readTemplates().filter((template) => {
    return template.template_id != templateId;
  });
  writeTemplates({ templates: [...templates] });
}

function templatesList() {
  return readTemplates();
}

function findTemplateByID(tempID) {
  return templatesList().find((temp) => temp.template_id == tempID);
}

module.exports = {
  deleteTemplate,
  editTemplate,
  createTemplate,
  templatesList,
  findTemplateByID,
};
