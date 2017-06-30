'use strict';

const knex = require('./../knex.js');

class InvitationModel {
  constructor() {
  }

  confirmGuests(guests, invitationId) {
    const gustsConfirmationPromises = guests.map(guest => {
      return this.confirmSingleGuest(guest, invitationId);
    });

    return Promise.all(gustsConfirmationPromises);
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
} 

module.exports = InvitationModel;
