const routes = require('express').Router();
const controller = require('./controller')

routes.get('', controller.checkRoute, controller.processData, controller.sortNdSend);

module.exports = routes;
