const express = require('express');

const templatesController = require('../controllers/templatesControllers');

const templatesRouter = new express.Router();

// ************** GET method routing ********************* //
templatesRouter.get('/', templatesController.getAllTemplates);
templatesRouter.get('/num', templatesController.getNumOfTemplates);
templatesRouter.get('/:id', templatesController.getTemplate);

// ************** POST method routing ********************* //

templatesRouter.post('/', templatesController.createTemplateHandler);

// ************** PUT method routing ********************* //

templatesRouter.put('/:id', templatesController.editTemplateHandler);

// ************** DELETE method routing ********************* //

templatesRouter.delete('/', templatesController.deleteTemplateHandler);

module.exports = {
  templatesRouter,
};
