(() => {
  class LoaderSpinner {
    constructor() {
      this.div = $(".cover");
    }
    
    setText(text) {
      this.div.find(".loader-text").html(text);
    }

    turnOn() {
      this.div.addClass("on");
    }
    
    turnOff() {
      this.div.removeClass("on");
    }
  }

  module.exports = LoaderSpinner;
})()