const templatesDAL = require(`../DAL/templatesDAL`);

const { v4: uuidv4, validate: validId } = require("uuid");

const createTemplateObj = (newTemplate) => {
  return {
    template_id: uuidv4(),
    name: newTemplate.name,
    creator: newTemplate.creator,
    date: new Date().toLocaleString(),
    html: newTemplate.html,
  };
};

async function createTemplate(template) {
  const newTemplate = createTemplateObj(template);
  const res = await templatesDAL.saveTemplate(newTemplate);
  if (!res) throw "Couldn't load new template to DB";
}

async function editTemplate(templateID, editedTemp) {
  await templatesDAL.updateTemplate(templateID, editedTemp);
}

async function deleteTemplate(templateId) {
  await templatesDAL.deleteTemplateDB(templateId);
}

async function templatesList() {
  return await templatesDAL.getAllTemplates();
}

async function findTemplateByID(tempID) {
  return await templatesDAL.getTemplateById(tempID);
}

module.exports = {
  deleteTemplate,
  editTemplate,
  createTemplate,
  templatesList,
  findTemplateByID,
};
