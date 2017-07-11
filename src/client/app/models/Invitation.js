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

    setGuests(guests) {
      this.guests = guests;
    }

    handleConfirmation(guests) {
      return new Promise((resolve, reject) => {
        this.controller.handleConfirmation(guests)
          .then(response => {
            resolve(response);
          })
          .catch(error => reject(error));
      });
    }

    getConfirmedGuestsFromKeys(referenceAsObject) {
      return Object.keys(referenceAsObject);
    }

    /* TODO: REMEMBER TO SYNCRONIZE GUESTS IN LOCAL AFTER SUCCESS HANDLIN */
  }

  module.exports = Invitation;
})();

