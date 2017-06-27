'use strict';

const controllers = require('./../controllers/main.js');

const routes = {
  invitation: {
    baseUri:  '/invitation/',
    controller: controllers.InvitationController
  }
};

module.exports = routes;
