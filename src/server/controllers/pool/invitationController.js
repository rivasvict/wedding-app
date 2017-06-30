'use strict';

const InvitationModel = require('./../../models/invitation.js');

class InvitationController {
  constructor() {
    this.model = new InvitationModel();
  }

  confirmGuests(guests, invitationId) {
    return this.model.confirmGuests(guests, invitationId);
  }
}

module.exports = InvitationController;
