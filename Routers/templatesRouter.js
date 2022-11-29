const express = require('express');
const app = express();

const templatesController = require('../controllers/templatesControllers');
const {editTemplateHandler} = require("../controllers/templatesControllers");


// ************** GET method routing ********************* //
app.get('/', templatesController.getAllTemplates);
app.get('/:id', templatesController.getTemplate);
app.get('/num', templatesController.getNumOfTemplates);

// ************** POST method routing ********************* //

app.post('/', templatesController.createTemplateHandler);

// ************** PUT method routing ********************* //

app.put('/:id', editTemplateHandler);

// ************** DELETE method routing ********************* //

app.delete('/', templatesController.deleteTemplateHandler);
