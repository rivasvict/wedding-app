(() => {
  const LoaderSpinner = require('../../modules/LoaderSpinner.js');
  
  class MarkupCommentHandler {
    constructor({ model }) {
      this.defineModels(model);
      this.defineMarkup();
      this.setEventsForModalHandling();
      this.characterLimit = 450;
      this.$characterLimitCounterSpan.html(this.characterLimit);
      
      this.$target.on("change paste keyup", () => {
        // limit possible text to the character limit, always
        this.$target.val(this.$target.val().substr(0, this.characterLimit));
        
        const newContentString = this.$target.val();
        const newContentStringLength = newContentString.length;
        
        console.log("Counter a " + newContentStringLength);
        this.$counter.html(newContentStringLength + " de " + 
          this.characterLimit + " caracteres disponibles.");
          
        if(newContentStringLength > (this.characterLimit - 20)) {
          this.$counter.addClass("character-counter-close-warning");
        } else {
          this.$counter.removeClass("character-counter-close-warning");
        }
        
        if(newContentStringLength == this.characterLimit) {
          this.$characterLimitReachedModal.modal('show');
        }
      })
    }

    defineModels(model) {
      this.model = model;
      this.comment = this.model.getComment();
    }

    defineMarkup() {
      this.$form = $('.comment-form');
      this.$target = this.$form.find('.comment-box');
      this.$counter = this.$form.find('.comment-box-character-counter');
      this.$characterLimitReachedModal = $('#comment-character-limit-reached-modal');
      this.$characterLimitCounterSpan = $(".comment-character-limit-number");
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
          loaderSpinner.turnOff();
        })
        .catch(error => {
          loaderSpinner.turnOff()
          reRenderInitialState();
          console.log('error');
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
