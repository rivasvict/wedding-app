'use strict';

const controllers = require('./../controllers/main.js');
const baseApiUrlPart = '/api';

const routes = {
  invitation: {
    baseUri:  `${baseApiUrlPart}/invitation/`,
    controller: controllers.InvitationController
  },
  comment: {
    baseUri:  `${baseApiUrlPart}/comment/`,
    controller: controllers.CommentController
  },
  email: {
    baseUri: `${baseApiUrlPart}/email/`,
    controller: controllers.EmailController
  }

};

module.exports = routes;
