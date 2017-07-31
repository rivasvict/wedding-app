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

    handleConfirmation(guestIds) {
      return new Promise((resolve, reject) => {
        this.controller.handleConfirmation(guestIds)
          .then(response => {
            this.synchrinizeGuestsWithLocal(guestIds);
            resolve(response);
          })
          .catch(error => reject(error));
      });
    }

    getConfirmedGuestsFromKeys(referenceAsObject) {
      return Object.keys(referenceAsObject);
    }

    synchrinizeGuestsWithLocal(confirmedGuestsId) {
      this.setAllGuestsToDefaultState();
      this.updateConfirmedGuests(confirmedGuestsId);
    }

    setAllGuestsToDefaultState() {
      this.guests = this.guests.map(guest => {
        guest.confirmed = false;
        return guest;
      });
    }

    updateConfirmedGuests(confirmedGuestsId) {
      this.guests = this.guests.map(guest => {
        const isTheGuestConfirmed = confirmedGuestsId.find(guestId => {
          return guest.id.toString() === guestId;
        });

        if (isTheGuestConfirmed) {
          guest.confirmed = true;
          return guest;
        }
        return guest;
      });
    }

    isGuestConfirmed(id) {
      const guest = this.guests.find(guest => {
        return guest.id.toString() === id.toString();
      });
      return guest.confirmed;
    }

    confirmSingleGuest(guestId) {
      return new Promise((resolve, reject) => {
        this.controller.confirmSingleGuest(guestId)
          .then(response => resolve(response))
          .catch(error => reject(error));
      });
    }

    unConfirmSinglueGuest(guestId) {
      return new Promise((resolve, reject) => {
        this.controller.unConfirmSingleGuest(guestId)
          .then(response => resolve(response))
          .catch(error => reject(error));
      });
    }

  }

  module.exports = Invitation;
})();
