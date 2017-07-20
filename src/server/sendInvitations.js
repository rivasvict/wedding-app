'use strict'

const EmailController = require('./controllers/pool/emailController.js');
const email = new EmailController();

email.sendInvitations();
