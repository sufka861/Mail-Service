const {paths} = require(`./config`);
const fs = require('fs');
const path = require(`node:path`)

function writeTemplates (templates) {
    fs.writeFile(path.join(__dirname,paths.templatesJasonPath), JSON.stringify(templates),`utf8`, err =>{
        if (err) throw err;
        console.log(`File Updated`);
    });

}

function readTemplates(){
    const templatesFile = require(paths.templatesJson);
    return templatesFile.templates;
}

module.exports = {
    writeTemplates,
    readTemplates
}