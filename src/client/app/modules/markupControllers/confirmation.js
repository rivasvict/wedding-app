(() => {
  const LoaderSpinner = require('../../modules/LoaderSpinner.js');
  const AcceptanceModal = require('../../modules/AcceptanceModal.js');
  
  class MarkupConfirmationHandler {
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
      this.$modal = $('#confirmation');
      this.$target = this.$modal.find('.modal-body');
    }

    setEventsForModalHandling() {
      this.$modal.on('show.bs.modal', this.activateModalContent.bind(this));
      this.$modal.on('hide.bs.modal', this.removeModalContent.bind(this));
      this.$modal.on('shown.bs.modal', this.activateContentAfterShow.bind(this));
      const $saveChangeButton = this.$modal.find('#save-changes');
      $saveChangeButton.on('click', this.handleGuestsConfirmation.bind(this));
    }

    activateModalContent() {
      this.$form = $('<form id="confirmation-form" name="confirmation"></form>');
      this.addConfirmAllButton();

      this.guests.forEach(guest => {
        const $checkboxToRender = this.getCheckboxTemplate({
          id: guest.id,
          name: guest.name
        });

        this.$form.append($checkboxToRender);
      });

      this.$target.append(this.$form);
    }

    addConfirmAllButton() {
      const $buttonContainer = $('<div class="col-xs-12 confirmation-button-container"></div>');
      this.$confirmAllButton = $('<button class="btn btn-primary">Confirmar todos</button>');
      $buttonContainer.append(this.$confirmAllButton);
      this.$form.append($buttonContainer);
    }

    /*
     * This needs to be changed to use id instead of name
     */
    getCheckboxTemplate({ name, id }) {
      const checkboxTemplate = '<div class="col-xs-12 toggle-row"><input type="checkbox"' + this.getCheckedStringOnConfirmed(id) + 'class="col-xs-6 row" name="' + id + '" type="checkbox"><label class="col-xs-6" for="' + id + '">' + name + '</label></div>';
      return $(checkboxTemplate);
    }

    activateContentAfterShow() {
      this.activateToggleSwitch();
      this.addListenersForButtons();
    }

    activateToggleSwitch() {
      this.$checkboxes = this.$form.find('input[type="checkbox"]');
      this.$checkboxes.bootstrapToggle({
        on: 'Confirmado',
        off: 'No Confirmado'
      });
      this.activateIndividualConfirmationListenerForToggles();
    }

    addListenersForButtons() {
      this.activateIndividualConfirmationListenerForToggles();
      this.activateConfirmateAllListener();
    }

    activateIndividualConfirmationListenerForToggles() {
      this.$checkboxes.change(this.individualConfirmationHandler.bind(this));
    }

    individualConfirmationHandler(event) {
      event.stopImmediatePropagation();
      const $target = $(event.currentTarget);
      const $parentOfCurrentTarget = $target.parent();
      const shouldConfirmGuest = this.getIfShouldConfirmGuest($parentOfCurrentTarget);
      const guestId = $target.attr('name');

      this.handleIndividualonfirmation({
        guestId,
        shouldConfirmGuest
      });
    }

    handleIndividualonfirmation({ guestId, shouldConfirmGuest }) {
      if (shouldConfirmGuest) {
        this.executeSingleConfirmationHandling({
          guestId,
          singleConfirmationHandler: this.model.confirmSingleGuest.bind(this.model),
          message: 'Invitado confirmado'
        });
      } else {
        this.executeSingleConfirmationHandling({
          guestId,
          singleConfirmationHandler: this.model.unConfirmSinglueGuest.bind(this.model),
          message: 'Invitado no confirmado'
        });
      }
    }

    executeSingleConfirmationHandling({ guestId, singleConfirmationHandler, message }) {
      const loaderSpinner = new LoaderSpinner('Enviando confirmaciones, por favor espere...');
      loaderSpinner.turnOn();

      singleConfirmationHandler(guestId)
        .then(response => {
          loaderSpinner.turnOff();
        })
        .catch(error => {
          loaderSpinner.turnOff();
          this.errorConfirmationHandler(error);
        });
    }

    isDateError(error) {
      return error.response && error.response.status === 400;
    }

    getIfShouldConfirmGuest($toggleToEvaluate) {
      return !$toggleToEvaluate.hasClass('off');
    }

    activateConfirmateAllListener() {
      this.$confirmAllButton.on('click', this.confirmAllGuests.bind(this));
    }

    confirmAllGuests(event) {
      event.preventDefault();
      const guestsToConfirm = this.model.getGuests().map(guest => {
        return guest.id.toString();
      });

      this.confirmSelectedGuests(guestsToConfirm);
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
      this.confirmSelectedGuests(confirmedGuests);
    }

    confirmSelectedGuests(confirmedGuests) {
      const loaderSpinner = new LoaderSpinner('Enviando confirmaciones, por favor espere...');
      loaderSpinner.turnOn();

      this.model.handleConfirmation(confirmedGuests)
        .then(response => {
          const acceptanceModal = new AcceptanceModal(
            'Confirmacion enviada.!',
            '¡Gracias! Hemos confirmado su asistencia, los esperamos.'
          );
          loaderSpinner.turnOff();
          this.$modal.modal('hide');
          acceptanceModal.show();
        })
        .catch(error => {
          loaderSpinner.turnOff();
          this.errorConfirmationHandler(error);
        });
    }

    errorConfirmationHandler(error) {
      this.reRenderInitialState();
      console.log(error);
      if (this.isDateError(error)) {
        alert('La fecha limite de confirmacion fue el 5 de Octubre, desafortunadamente no podemos cambiar la lista, lo sentimos mucho');
      } else {
        alert('La base de datos no pudo actualizarse, por favor contactar al administrador del sistema');
      }
    }

    reRenderInitialState() {
      this.removeModalContent();
      this.activateModalContent();
    }
  }

  module.exports = MarkupConfirmationHandler;
})()
