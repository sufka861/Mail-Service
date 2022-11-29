const express = require('express');

const clientController = require('../controllers/clientController');

const clientRouter = new express.Router();

clientRouter.get('*', clientController.loadPage );

module.exports = {
    clientRouter
}