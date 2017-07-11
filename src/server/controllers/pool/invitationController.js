'use strict';

const InvitationModel = require('./../../models/invitation.js');

class InvitationController {
  constructor() {
    this.model = new InvitationModel();
  }

  confirmGuests(guestIds, invitationId) {
    return this.model.confirmGuests(guestIds, invitationId);
  }

  getGuestsBasedOnInvitation(invitationId) {
    return this.model.getAllGuestsBasedOnInvitation(invitationId)
  }

  getNumberOfConfirmedGuests() {
    return this.model.getNumberOfConfirmedGuests();
  }
}

module.exports = InvitationController;
