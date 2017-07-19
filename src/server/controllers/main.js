'use strict';

const InvitationController = require('./pool/invitationController.js');
const CommentController = require('./pool/commentController.js');
const EmailController = require('./pool/emailController.js');

const controllers = {
  InvitationController,
  CommentController,
  EmailController
};

module.exports = controllers;
