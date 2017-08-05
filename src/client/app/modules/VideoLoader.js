'use-strict';
(() => {
  
  class VideoLoader {
    constructor(src, selector_id, element_id, showAtMinWidth) {
      this.$elem = $("#" + selector_id);
      this.element_id = "#" + element_id;
      this.src = src;
      
      if(showAtMinWidth == undefined) {
        this.showAtMinWidth = null;
      } else {
        this.showAtMinWidth = showAtMinWidth;
      }
      
      this.conditionalLoad();
    }
    
    getScreenWidthInPixels() {
      var width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
      
      return width;
    }

    conditionalLoad() {
      var show = false;
      
      if(this.showAtMinWidth == null) {
        show = true;
      } else if(this.showAtMinWidth < this.getScreenWidthInPixels()) {
        show = true;
      }
      
      if(show == true) {
        this.insertVideoInSelector();
      }
    }
    
    insertVideoInSelector() {
      $('<video/>', {
        id: this.element_id.substring(1),
        preload: "auto",
        autoplay: "autoplay",
        muted: "true",
        loop: "loop",
      }).appendTo(this.$elem);
      
      $('<source/>', {
        src: this.src + ".mp4",
        type: "video/mp4"
      }).appendTo(this.element_id);
      
      $('<source/>', {
        src: this.src + ".ogg",
        type: "video/ogg"
      }).appendTo(this.element_id);
    }
  }

  module.exports = VideoLoader;
})();