
const routes = require('express').Router();
const controller = require('./controller');

routes.get('', controller.ping);

module.exports = routes;
