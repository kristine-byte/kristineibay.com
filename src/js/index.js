//=include plugins/js/jquery.paroller.min.js
//=include plugins/js/textition.js



if (window.location.hash) {
    var hash = window.location.hash;

    if ($(hash).length) {
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 0, 'swing');
    }
} 

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

      /* Attach the function to the resize event listener */
      // window.addEventListener('resize', mediaSize, false);  
      $('.my-paroller').paroller();
          // AOS.init({
          //   once: false
          // });

}(jQuery));


// form - https://formspree.io/forms/xdopwrqn/integration

  window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    var form = document.getElementById("contact-form");
    var button = document.getElementById("contact-form-button");
    var status = document.getElementById("contact-form-status");

    // Success and Error functions for after the form is submitted
    
    if (form.length > 0) {
			
    function success() {
      form.reset();
      form.classList.add("hide");
      //button.style = "display: none ";
      status.classList.add("show");
      status.innerHTML = "Thanks! Your message has been received! I'll reply as soon as possible.";
    }

    function error() {
      status.classList.add("show");
      status.innerHTML = "Oops! There was a problem. Please try again";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
			
		} else {
			console.log('no form');
		}
  });
  
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
