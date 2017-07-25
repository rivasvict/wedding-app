(() => {
  class LoaderSpinner {
    constructor() {
      this.$cover = $(".cover");
    }
    
    setText(text) {
      this.$cover.find(".loader-text").html(text);
    }

    turnOn() {
      this.$cover.addClass("on");
    }
    
    turnOff() {
      this.$cover.removeClass("on");
    }
  }

  module.exports = LoaderSpinner;
})()