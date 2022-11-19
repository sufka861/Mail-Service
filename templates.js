const {readTemplates, writeTemplates} = require(`./templatesDAL`)
const eventsEmitter = require('events');
const templateEvents = new eventsEmitter();
const {v4: uuidv4, validate: validId} = require('uuid')


const events = {
    CREATE: 'template_create',
    DELETE: 'template_delete',
    EDIT: `template_edit`
}

const createTemplate = (name, creator, date, html) => {
    return {
        template_id: uuidv4(),
        name: name,
        creator: creator,
        date: date,
        html: html
    }
}


function create(name, creator, date, html) {
    const template = createTemplate(name, creator, date, html);
    const templatesFile = readTemplates();
    const updatedTemplateFile = {
        ...templatesFile,
        templates: [...templatesFile.templates, template]
    };
    writeTemplates(updatedTemplateFile);

}

function edit(templateID, name ="", creator="", html="") {
    const templates = readTemplates();
    templates.forEach(
        function (obj)
        {
            if (obj.template_id === templateID) {
                if(name)
                    obj.name = name;
                if (creator)
                    obj.creator = creator;
                if (html)
                    obj.html = html;
            }
            obj.date = new Date().toLocaleString();
        }
    )

    writeTemplates({templates: [...templates]});

}

function deleteTemplate (templateId) {
    const templates = readTemplates().filter(template => {
        return template.template_id !== templateId;
    });;

    writeTemplates({templates: [...templates]});
}

function templatesList (){
    return readTemplates()
}


templateEvents.on(events.CREATE, create)
    .on(events.EDIT, edit)
    .on(events.DELETE, deleteTemplate);

module.exports = {
    events,
    templateEvents,
    templatesList
}