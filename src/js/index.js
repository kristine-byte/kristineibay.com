//=include plugins/js/jquery.min.js
//=include plugins/js/jquery.paroller.min.js
//=include plugins/js/textition.js

$(document).ready(function() {
   $('#example').textition({
       autoplay: true,
       animation: 'ease-out',
      interval: 4,
      map: {x: 200, y: 100, z: 0},
  }); 
});


var $animation_elements = $('.reveal-image');
var $window = $(window);

function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.innerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
        $element.addClass('reveal');
    } else {
        // $element.removeClass('reveal');
    }
    });
}
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');     

(function($) {
  "use strict";

    $.fn.andSelf = function() {
      return this.addBack.apply(this, arguments);
    }

    /* Loader Code Start */
       $(window).on("load", function() { 
        $(".loader").fadeOut("slow");

        });

    /* Parallax animation */
      var image4 = document.getElementsByClassName('ifour');
      new simpleParallax(image4, {
        overflow: true,
        scale: 10.5,
        orientation: 'left',
        delay: .1,
        transition: 'cubic-bezier(0,0,0,100)',
        
      });

    /* Loader Code End */

      /* Attach the function to the resize event listener */
      // window.addEventListener('resize', mediaSize, false);  
      $('.my-paroller').paroller();
          // AOS.init({
          //   once: false
          // });

}(jQuery));