(() => {
  class LoaderSpinner {
    constructor(text) {
      this.$cover = $(".cover");
      this.setText(text);
      this.turnOffTimeout = 500;
    }
    
    setText(text) {
      this.$cover.find(".loader-text").html(text);
    }

    turnOn() {
      this.$cover.addClass("on");
    }
    
    setTurnOffTimeout(timeout) {
      this.turnOffTimeout = timeout;
    }
    
    turnOff() {
      setTimeout(() => {
        this.$cover.removeClass("on");
      }, this.turnOffTimeout);
    }
  }

  module.exports = LoaderSpinner;
})()