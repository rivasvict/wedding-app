'use strict';

const controllers = require('./../controllers/main.js');
const baseApiUrlPart = '/api';

const routes = {
  invitation: {
    baseUri:  baseApiUrlPart + '/invitation/',
    controller: controllers.InvitationController
  }
};

module.exports = routes;
