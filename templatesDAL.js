const {paths} = require(`./config`);
const fs = require('fs');

function writeTemplates (templates) {
    fs.writeFileSync(paths.templatesJasonPath, JSON.stringify(templates));

}

function readTemplates(){
    const templatesFile = require(paths.templatesJson);
    return templatesFile.templates;
}

module.exports = {
    writeTemplates,
    readTemplates
}