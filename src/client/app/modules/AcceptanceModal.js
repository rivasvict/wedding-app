(() => {
  class AcceptanceModal {
    
    /**
     * Class constructor.
     */
    constructor() {
      this.$modal = $("#successModal");
      this.$title = this.$modal.find(".modal-title");
      this.$body  = this.$modal.find(".success-body-text");
      this.$acceptButton = this.$modal.find(".accept-button");
    }
    
    /**
     * Sets the title of the modal.
     */
    setTitle(text) {
      this.$title.html(text);
    }
    
    /**
     *Sets the text of the modal.
     */
    setText(text) {
      this.$body.html(text);
    }

    /**
     * Shows the confirmation modal.
     */
    show() {
      this.$modal.modal('show');
    }
    
  }

  module.exports = AcceptanceModal;
})()