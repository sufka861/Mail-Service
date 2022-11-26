const {paths} = require(`../DB/config`);
const fs = require('fs');
const path = require(`node:path`)

function writeTemplates (templates) {
    fs.writeFile((`../${paths.templatesJasonPath}`), JSON.stringify(templates),`utf8`, err =>{
        if (err) throw err;
        console.log(`File Updated`);
    });

}

function readTemplates(){
    const templatesFile = require(`../${paths.templatesJasonPath}`);
    return templatesFile.templates;
}

module.exports = {
    writeTemplates,
    readTemplates
}