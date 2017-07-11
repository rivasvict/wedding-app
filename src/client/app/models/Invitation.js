(() => {
  const InvitationController = require('./../modules/Invitation.js');

  class Invitation {
    constructor({ invitationId }) {
      this.invitationId = invitationId;
      this.guests = [];
      this.controller = new InvitationController({ invitationId });
    }

    fetchGuests() {
      return new Promise((resolve, reject) => {
        this.controller.getGuests()
          .then(response => {
            this.guests = response.data.data;
            resolve(response);
          })
          .catch(error => reject(error));
      });
    }

    getGuests() {
      return this.guests;
    }
  }

  module.exports = Invitation;
})();

