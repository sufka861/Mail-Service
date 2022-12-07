const { paths } = require(`../DB/config`);
const fs = require("fs");
const path = require(`path`);
const { Template } = require("../DB/templatesSchema");

async function saveTemplate(newTemplate) {
  const templateToSave = new Template(newTemplate);
  return await templateToSave.save();
}

async function getAllTemplates() {
  return Template.find({});
}

async function getTemplateById(templateID) {
  return Template.findOne({ template_id: templateID });
}

async function deleteTemplateDB(templateID) {
  await Template.deleteOne({ template_id: templateID });
}

async function updateTemplate(templateID, editedTemp) {
  await Template.updateOne({ template_id: templateID }, editedTemp);
}

module.exports = {
  getAllTemplates,
  getTemplateById,
  deleteTemplateDB,
  updateTemplate,
  saveTemplate,
};
