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
      const checkboxTemplate = '<input type="checkbox" class="col-xs-6 row" id="' + name + '" name="' + name + '"><label class="col-xs-6" for="' + name + '">' + name + '</label>';
      return $(checkboxTemplate);
    }

    removeModalContent() {
      this.$target.children().remove();
    }

    handleGuestsConfirmation() {
      debugger;
    }
  }

  module.exports = markupConfirmationHandler;
})()
