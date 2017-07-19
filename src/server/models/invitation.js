'use strict';

const knex = require('./../knex.js');
const guest = 'guest';
const invitations = 'invitations';

class InvitationModel {
  constructor() {
  }

  confirmGuests(guestIds, invitationId) {
    const guestsConfirmationPromises = [ this.setAllConfirmationForAnInvitationToFalse(invitationId), ...guestIds
      .map(guestId => {
      return this.confirmSingleGuest(guestId, invitationId);
    }) ]

    return Promise.all(guestsConfirmationPromises);
  }

  confirmSingleGuest(guestId, invitationId) {
    return knex(guest)
      .where({
        id: guestId,
        invitation_id: invitationId
      })
      .update({
        confirmed: true
      })
  }

  setAllConfirmationForAnInvitationToFalse(invitationId) {
    return knex(guest)
      .where({
        invitation_id: invitationId
      })
      .update({
        confirmed: false
      });
  }

  getAllGuestsBasedOnInvitation(invitationId) {
    return knex(guest)
      .where({
        invitation_id: invitationId
      })
      .select('name', 'id', 'confirmed');
  }

  getNumberOfConfirmedGuests() {
    return knex(guest)
      .where({
        confirmed: true
      })
      .count()
  }

  getAllNonSentInvitations() {
    return knex(invitations)
      .where({
        sent: false,
        can_be_used: true
      })
      .select('complete_name', 'email', 'id');
  }

  setInvitationToSent(invitationId) {
    return knex(invitations)
      .where({
        id: invitationId
      })
      .update({
        sent: true
      });
  }

} 

module.exports = InvitationModel;
