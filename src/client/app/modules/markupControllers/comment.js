(() => {
  const LoaderSpinner = require('../../modules/LoaderSpinner.js');
  const AcceptanceModal = require('../../modules/AcceptanceModal.js');
  
  class MarkupCommentHandler {
    constructor({ model }) {
      this.defineModels(model);
      this.defineMarkup();
      this.setEventsForModalHandling();
    }

    defineModels(model) {
      this.model = model;
      this.comment = this.model.getComment();
    }

    defineMarkup() {
      this.$form = $('.comment-form');
      this.$target = this.$form.find('.comment-box');
    }

    setEventsForModalHandling() {
      this.activateCommentContent();
      const $saveChangeButton = $('#send-comment');
      $saveChangeButton.on('click', this.sendComment.bind(this));
    }

    activateCommentContent() {
      this.model.fetchComment()
        .then(response => {
          const commentAssociatedData = response.data.data.shift();
          const comment = commentAssociatedData.comment;
          this.model.setComment(comment);
          this.$target.val(comment);
        })
        .catch(error => console.log(error))
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

    removeTextAreaContent() {
      this.model.setCommentToDefaultState();
      this.$target.val(this.model.comment);
    }

    sendComment(event) {
      const formData = this.$form.serializeJSON();
      const comment = formData.comment;
      const loaderSpinner = new LoaderSpinner("Enviando comentario, por favor espere...");
      event.preventDefault();
      loaderSpinner.turnOn();

      this.model.postComment(comment)
        .then(response => {
          const commentSentModal = new AcceptanceModal(
            "¡Comentario enviado!",
            "Muchas gracias por tus buenos deseos, ya los hemos recibido."
          );
          loaderSpinner.turnOff();
          commentSentModal.show();
        })
        .catch(error => {
          loaderSpinner.turnOff()
          this.reRenderInitialState();
          console.log('error');
          console.log(error);
          alert('La base de datos no pudo actualizarse, por favor contactar al administrador del sistema');
        });
    }

    reRenderInitialState() {
      this.removeTextAreaContent();
      this.activateCommentContent();
    }
  }

  module.exports = MarkupCommentHandler;
})()
