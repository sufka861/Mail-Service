const { paths } = require(`../DB/config`);
const fs = require("fs");
const path = require(`node:path`);
const { Template } = require("../DB/templatesSchema");

function writeTemplates(templates) {
  fs.writeFile(
    path.join(process.cwd(), paths.templatesJasonPath),
    JSON.stringify(templates),
    `utf8`,
    (err) => {
      if (err) throw err;
      console.log(`File Updated`);
    }
  );
}

function readTemplates() {
  const templatesFile = require(path.join(
    process.cwd(),
    paths.templatesJasonPath
  ));
  return templatesFile.templates;
}

async function getAllTemplates() {
  return Template.find({});
}

module.exports = {
  writeTemplates,
  readTemplates,
  getAllTemplates,
};
