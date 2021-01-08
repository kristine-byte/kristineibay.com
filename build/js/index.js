var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (r) {
	"use strict";
	"function" == typeof define && define.amd ? define("parollerjs", ["jquery"], r) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = r(require("jquery")) : r(jQuery);
}(function (g) {
	"use strict";
	var v = !1,
	    x = function x() {
		v = !1;
	},
	    b = function b(r, t) {
		return r.css({ "background-position": "center " + -t + "px" });
	},
	    k = function k(r, t) {
		return r.css({ "background-position": -t + "px center" });
	},
	    y = function y(r, t, o, n) {
		return "none" !== n || (n = ""), r.css({ "-webkit-transform": "translateY(" + t + "px)" + n, "-moz-transform": "translateY(" + t + "px)" + n, transform: "translate(0," + t + "px)" + n, transition: o, "will-change": "transform" });
	},
	    z = function z(r, t, o, n) {
		return "none" !== n || (n = ""), r.css({ "-webkit-transform": "translateX(" + t + "px)" + n, "-moz-transform": "translateX(" + t + "px)" + n, transform: "translate(" + t + "px, 0)" + n, transition: o, "will-change": "transform" });
	},
	    M = function M(r, t, o) {
		var n = r.data("paroller-factor"),
		    a = n || o.factor;if (t < 576) {
			var e = r.data("paroller-factor-xs"),
			    i = e || o.factorXs;return i || a;
		}if (t <= 768) {
			var c = r.data("paroller-factor-sm"),
			    s = c || o.factorSm;return s || a;
		}if (t <= 1024) {
			var u = r.data("paroller-factor-md"),
			    f = u || o.factorMd;return f || a;
		}if (t <= 1200) {
			var l = r.data("paroller-factor-lg"),
			    d = l || o.factorLg;return d || a;
		}if (t <= 1920) {
			var p = r.data("paroller-factor-xl"),
			    h = p || o.factorXl;return h || a;
		}return a;
	},
	    j = function j(r, t) {
		return Math.round(r * t);
	},
	    X = function X(r, t, o, n) {
		return Math.round((r - o / 2 + n) * t);
	},
	    q = function q(r) {
		return r.css({ "background-position": "unset" });
	},
	    T = function T(r) {
		return r.css({ transform: "unset", transition: "unset" });
	};g.fn.paroller = function (h) {
		var m = g(window).height(),
		    w = g(document).height();h = g.extend({ factor: 0, factorXs: 0, factorSm: 0, factorMd: 0, factorLg: 0, factorXl: 0, transition: "transform .1s ease", type: "background", direction: "vertical" }, h);return this.each(function () {
			var o = g(this),
			    n = g(window).width(),
			    a = o.offset().top,
			    e = o.outerHeight(),
			    r = o.data("paroller-type"),
			    t = o.data("paroller-direction"),
			    i = o.data("paroller-transition"),
			    c = o.css("transform"),
			    s = i || h.transition,
			    u = r || h.type,
			    f = t || h.direction,
			    l = 0,
			    d = j(a, l),
			    p = X(a, l, m, e);"background" === u ? "vertical" === f ? b(o, d) : "horizontal" === f && k(o, d) : "foreground" === u && ("vertical" === f ? y(o, p, s, c) : "horizontal" === f && z(o, p, s, c)), g(window).on("resize", function () {
				var r = g(this).scrollTop();n = g(window).width(), a = o.offset().top, e = o.outerHeight(), l = M(o, n, h), d = Math.round(a * l), p = Math.round((a - m / 2 + e) * l), v || (window.requestAnimationFrame(x), v = !0), "background" === u ? (q(o), "vertical" === f ? b(o, d) : "horizontal" === f && k(o, d)) : "foreground" === u && r <= w && (T(o), "vertical" === f ? y(o, p, s) : "horizontal" === f && z(o, p, s));
			}), g(window).on("scroll", function () {
				var r = g(this).scrollTop(),
				    t = g(document).scrollTop();l = 0 === t ? 0 : M(o, n, h), d = Math.round((a - r) * l), p = Math.round((a - m / 2 + e - r) * l), v || (window.requestAnimationFrame(x), v = !0), "background" === u ? "vertical" === f ? b(o, d) : "horizontal" === f && k(o, d) : "foreground" === u && r <= w && ("vertical" === f ? y(o, p, s, c) : "horizontal" === f && z(o, p, s, c));
			});
		});
	};
});

/* * * * * * * * * * * * * * * * * * * * * * *
 * textition.js v1.0.2
 * https://github.com/dimajt/textition.js
 * Dima Karpov (c) 2013
 * * * * * * * * * * * * * * * * * * * * * * */

(function ($) {
	$.fn.textition = function (options) {

		// ----------------
		// VARS
		// ---------------

		// options
		var data = $.extend({
			map: {
				x: 100,
				y: 50,
				z: 1000
			},
			speed: 1,
			animation: 'ease',
			handler: 'click',
			perspective: 300,
			autoplay: false,
			interval: 3,
			element: this
		}, options);

		// vars
		var div = this,
		    child = this.children(),
		    letters,
		    index = 0,
		    position = {},
		    playing;

		// ----------------
		// UTILITY
		// ---------------

		// filter text
		var filter = function filter(val) {
			switch (val) {
				case ' ':
					return '&nbsp;';

				default:
					return val;
			}
		};

		// get position
		var getPosition = function getPosition() {
			var span = child.first();
			position.top = span.offset().top - div.offset().top;
			position.left = span.offset().left - div.offset().left;
			position.width = span.width();
		};

		// random distance
		var val = function val(_val) {
			return Math.round(Math.random() * _val) - _val / 2;
		};

		// ----------------
		// BIND
		// ---------------

		// hide letters
		var hide = function hide() {
			var x = 0,
			    y = 0,
			    z = 0;
			for (var i in data.map) {
				switch (i) {
					case 'x':
						x = val(data.map.x);
						break;
					case 'y':
						y = val(data.map.y);
						break;
					case 'z':
						z = val(data.map.z);
						break;
				}
			}
			$(this).css({
				'-webkit-transform': 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
				'-moz-transform': 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
				'-ms-transform': 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
				'-o-transform': 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
				'transform': 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)'
			});
		};

		// disappear
		var disappear = function disappear(span) {
			$(span).css('opacity', 0).children().each(hide);

			index++;
			if (index > child.length - 1) {
				index = 0;
			}
		};

		// show
		var show = function show() {
			$(this).css({
				'-webkit-transform': 'translate3d(0px, 0px, 0px)',
				'-moz-transform': 'translate3d(0px, 0px, 0px)',
				'-ms-transform': 'translate3d(0px, 0px, 0px)',
				'-o-transform': 'translate3d(0px, 0px, 0px)',
				'transform': 'translate3d(0px, 0px, 0px)'
			});
		};

		// appear
		var appear = function appear(span) {
			$(span).css('opacity', 1).children().each(show);
		};

		// run
		var run = function run(e) {
			if (data.autoplay && e && !e.isTrigger) {
				clearInterval(playing);
				playing = setInterval(play, data.interval * 1000);
			}
			disappear(child[index]);
			appear(child[index]);
		};

		// ----------------
		// CSS
		// ---------------	


		// child style
		var childStyle = function childStyle() {
			$(this).css({
				'-webkit-transform-style': 'preserve-3d',
				'-moz-transform-style': 'preserve-3d',
				'-ms-transform-style': 'preserve-3d',
				'-o-transform-style': 'preserve-3d',
				'transform-style': 'preserve-3d',
				'-webkit-transition': 'opacity ' + data.speed + 's ' + data.animation,
				'-moz-transition': 'opacity ' + data.speed + 's ' + data.animation,
				'-ms-transition': 'opacity ' + data.speed + 's ' + data.animation,
				'-o-transition': 'opacity ' + data.speed + 's ' + data.animation,
				'transition': 'opacity ' + data.speed + 's ' + data.animation,
				'position': 'absolute',
				'display': 'block',
				'width': position.width,
				'left': position.left,
				'top': position.top
			});
		};

		// div style
		var divStyle = function divStyle() {
			var pos = div.css('position');
			div.css({
				'-webkit-perspective': data.perspective + 'px',
				'-moz-perspective': data.perspective + 'px',
				'-ms-perspective': data.perspective + 'px',
				'-o-perspective': data.perspective + 'px',
				'perspective': data.perspective + 'px',
				'position': pos === 'static' ? 'relative' : pos,
				'height': div.height(),
				'width': div.width()
			});
		};

		//	letter style
		var letterStyle = function letterStyle() {
			$(this).css({
				'-webkit-transition': '-webkit-transform ' + data.speed + 's ' + data.animation,
				'-moz-transition': '-moz-transform ' + data.speed + 's ' + data.animation,
				'-ms-transition': '-ms-transform ' + data.speed + 's ' + data.animation,
				'-o-transition': '-o-transform ' + data.speed + 's ' + data.animation,
				'transition': 'transform ' + data.speed + 's ' + data.animation,
				'display': 'inline-block'
			});
		};

		// ----------------
		// INITIALIZATION
		// ---------------	


		// create letters
		var createLetters = function createLetters() {

			var span = $(this);
			var text = span.text();
			var code = '';

			for (var i = 0; i < text.length; i++) {
				code += '<l>' + filter(text[i]) + '</l>';
			}
			span.html(code);
		};

		// draw
		var draw = function draw() {
			var other = child.not(':first');
			other.hide().css('opacity', 0);

			divStyle();
			child.each(createLetters);
			child.each(childStyle);

			letters = div.find('l');
			letters.each(letterStyle);
			other.show().children().each(hide);
		};

		// play
		var play = function play() {
			run();
		};

		// init
		var init = function init() {
			var time = new Date();
			getPosition();
			draw();

			if (data.handler) {
				data.element.bind(data.handler, run);
			}

			if (data.autoplay) {
				playing = setInterval(play, data.interval * 1000);
			}
		};

		// Run		
		init();
	};
})(jQuery);

if (window.location.hash) {
	var hash = window.location.hash;

	if ($(hash).length) {
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, 0, 'swing');
	}
}

$(document).ready(function () {
	$('#example').textition({
		autoplay: true,
		animation: 'ease-out',
		interval: 4,
		map: { x: 200, y: 100, z: 0 }
	});
});

var $animation_elements = $('.reveal-image');
var $window = $(window);

function check_if_in_view() {
	var window_height = $window.height();
	var window_top_position = $window.scrollTop();
	var window_bottom_position = window_top_position + window_height;

	$.each($animation_elements, function () {
		var $element = $(this);
		var element_height = $element.innerHeight();
		var element_top_position = $element.offset().top;
		var element_bottom_position = element_top_position + element_height;

		//check to see if this current container is within viewport
		if (element_bottom_position >= window_top_position && element_top_position <= window_bottom_position) {
			$element.addClass('reveal');
		} else {
			// $element.removeClass('reveal');
		}
	});
}
$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

(function ($) {

	/* Attach the function to the resize event listener */
	// window.addEventListener('resize', mediaSize, false);  
	$('.my-paroller').paroller();
	// AOS.init({
	//   once: false
	// });
})(jQuery);

// form - https://formspree.io/forms/xdopwrqn/integration

window.addEventListener("DOMContentLoaded", function () {

	// get the form elements defined in your form HTML above

	var form = document.getElementById("contact-form");
	var button = document.getElementById("contact-form-button");
	var status = document.getElementById("contact-form-status");

	// Success and Error functions for after the form is submitted

	if (form.length > 0) {
		var success = function success() {
			form.reset();
			form.classList.add("hide");
			//button.style = "display: none ";
			status.classList.add("show");
			status.innerHTML = "Thanks! Your message has been received! I'll reply as soon as possible.";
		};

		var error = function error() {
			status.classList.add("show");
			status.innerHTML = "Oops! There was a problem. Please try again";
		};

		// handle the form submission event

		form.addEventListener("submit", function (ev) {
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
	xhr.onreadystatechange = function () {
		if (xhr.readyState !== XMLHttpRequest.DONE) return;
		if (xhr.status === 200) {
			success(xhr.response, xhr.responseType);
		} else {
			error(xhr.status, xhr.response, xhr.responseType);
		}
	};
	xhr.send(data);
}