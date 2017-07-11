(() => {
  class markupConfirmationHandler {
    constructor({ model }) {
      this.defineModels(model);
      this.defineMarkup();
      this.setEventsForModalHandling();
    }

    defineModels(model) {
      this.model = model;
      this.guests = this.model.getGuests();
    }

    defineMarkup() {
      this.$modal = $('.modal');
      this.$target = this.$modal.find('.modal-body');
    }

    setEventsForModalHandling() {
      this.$modal.on('show.bs.modal', this.activateModalContent.bind(this));
      this.$modal.on('hide.bs.modal', this.removeModalContent.bind(this));
      const $saveChangeButton = this.$modal.find('#save-changes');
      $saveChangeButton.on('click', this.handleGuestsConfirmation.bind(this));
    }

    activateModalContent() {
      this.$form = $('<form id="confirmation-form" name="confirmation"></form>');

      this.guests.forEach(guest => {
        const $checkboxToRender = this.getCheckboxTemplate({
          id: guest.id,
          name: guest.name
        });

        this.$form.append($checkboxToRender);
      });

      this.$target.append(this.$form);
    }

    /*
     * This needs to be changed to use id instead of name
     */
    getCheckboxTemplate({ name, id }) {
      const checkboxTemplate = '<input type="checkbox"' + this.getCheckedStringOnConfirmed(id) + 'class="col-xs-6 row" name="' + id + '"><label class="col-xs-6" for="' + id + '">' + name + '</label>';
      return $(checkboxTemplate);
    }

    getCheckedStringOnConfirmed(id) {
      return this.model.isGuestConfirmed(id) ? ' checked ' : '';
    }

    removeModalContent() {
      this.$target.children().remove();
    }

    handleGuestsConfirmation() {
      const confirmedFromForm = this.$form.serializeJSON();
      const confirmedGuests = this.model.getConfirmedGuestsFromKeys(confirmedFromForm);

      this.model.handleConfirmation(confirmedGuests)
        .then(response => this.$modal.modal('hide'))
        .catch(error => console.log(error));
    }
  }

  module.exports = markupConfirmationHandler;
})()
