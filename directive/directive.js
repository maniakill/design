app.animation('.anim', function() {
  return {
    enter : function(element, done) {
      jQuery(element).animate({
width: "70%",
opacity: 0.4,
marginLeft: "0.6in",
fontSize: "3em",
borderWidth: "10px"
}, 1500 );

      return function(cancelled) {
        /* this (optional) function is called when the animation is complete
           or when the animation has been cancelled (which is when
           another animation is started on the same element while the
           current animation is still in progress). */
        if(cancelled) {
          jQuery(element).stop();
        }
      }
    },

    leave : function(element, done) { done(); },
    move : function(element, done) { done(); },

    beforeAddClass : function(element, className, done) { done(); },
    addClass : function(element, className, done) { done(); },

    beforeRemoveClass : function(element, className, done) { done(); },
    removeClass : function(element, className, done) { done(); },

    allowCancel : function(element, event, className) {}
  };
});
