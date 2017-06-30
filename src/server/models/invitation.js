'use strict';

const knex = require('./../knex.js');

class InvitationModel {
  constructor() {
  }

  confirmGuests(guests, invitationId) {
    const guestsConfirmationPromises = [ this.setAllConfirmationForAnInvitationToFalse(invitationId), ...guests
      .map(guest => {
      return this.confirmSingleGuest(guest, invitationId);
    }) ]

    return Promise.all(guestsConfirmationPromises);
  }

  confirmSingleGuest(name, invitationId) {
    return knex('guest')
      .where({
        name,
        invitation_id: invitationId
      })
      .update({
        confirmed: true
      })
  }

  setAllConfirmationForAnInvitationToFalse(invitationId) {
    return knex('guest')
      .where({
        invitation_id: invitationId
      })
      .update({
        confirmed: false
      });
  }

} 

module.exports = InvitationModel;
