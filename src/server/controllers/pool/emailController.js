'use strict';

const knex = require('./../../knex.js');
const InvitationEmail = require('./../../models/email.js');
const InvitationModel = require('./../../models/invitation.js');

class EmailController {
  constructor() {
    this.invitation = new InvitationModel();
  }

  sendInvitations() {
    return new Promise((resolve, reject) => {
      this.invitation.getAllNonSentInvitations()
        .then(receivers => {
          receivers.forEach(receiver => {
            this.sendIndividualInvitation(receiver)
              .then(info => resolve(info))
              .catch(error => reject(error));
          });
        })
        .catch(error => reject(error));
    });
  }

  sendIndividualInvitation(receiver) {
    return new Promise((resolve, reject) => {
      const invitationsEmail = new InvitationEmail({
        to: receiver.email,
        familyName: receiver.complete_name,
        invitationUrl: 'http://bodacathyvictor.com?invutationId=' + receiver.id
      });

      invitationsEmail.send()
        .then(info => {
          if (info.accepted.length) {
            this.invitation.setInvitationToSent(receiver.id)
              .then(response => {
                console.log('Email successfully sent to: ' + receiver.complete_name);
                resolve(info);
              })
              .catch(error => reject(error))
          }
        })
        .catch(error => reject(error));
    });
  }
}

module.exports = EmailController;
