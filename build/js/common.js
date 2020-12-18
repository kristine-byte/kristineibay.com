var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Validator v0.9.0 for Bootstrap 3, by @1000hz
 * Copyright 2015 Cina Saffary
 * Licensed under http://opensource.org/licenses/MIT
 *
 * https://github.com/1000hz/bootstrap-validator
 */

+function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = a.extend({}, c.DEFAULTS, d.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b),
                f = d.data("bs.validator");(f || "destroy" != b) && (f || d.data("bs.validator", f = new c(this, e)), "string" == typeof b && f[b]());
        });
    }var c = function c(b, d) {
        this.$element = a(b), this.options = d, d.errors = a.extend({}, c.DEFAULTS.errors, d.errors);for (var e in d.custom) {
            if (!d.errors[e]) throw new Error("Missing default error message for custom validator: " + e);
        }a.extend(c.VALIDATORS, d.custom), this.$element.attr("novalidate", !0), this.toggleSubmit(), this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator", a.proxy(this.validateInput, this)), this.$element.on("submit.bs.validator", a.proxy(this.onSubmit, this)), this.$element.find("[data-match]").each(function () {
            var b = a(this),
                c = b.data("match");a(c).on("input.bs.validator", function () {
                b.val() && b.trigger("input.bs.validator");
            });
        });
    };c.INPUT_SELECTOR = ':input:not([type="submit"], button):enabled:visible', c.DEFAULTS = { delay: 500, html: !1, disable: !0, custom: {}, errors: { match: "Does not match", minlength: "Not long enough" }, feedback: { success: "glyphicon-ok", error: "glyphicon-remove" } }, c.VALIDATORS = { "native": function native(a) {
            var b = a[0];return b.checkValidity ? b.checkValidity() : !0;
        }, match: function match(b) {
            var c = b.data("match");return !b.val() || b.val() === a(c).val();
        }, minlength: function minlength(a) {
            var b = a.data("minlength");return !a.val() || a.val().length >= b;
        } }, c.prototype.validateInput = function (b) {
        var c = a(b.target),
            d = c.data("bs.validator.errors");if (c.is('[type="radio"]') && (c = this.$element.find('input[name="' + c.attr("name") + '"]')), this.$element.trigger(b = a.Event("validate.bs.validator", { relatedTarget: c[0] })), !b.isDefaultPrevented()) {
            var e = this;this.runValidators(c).done(function (f) {
                c.data("bs.validator.errors", f), f.length ? e.showErrors(c) : e.clearErrors(c), d && f.toString() === d.toString() || (b = f.length ? a.Event("invalid.bs.validator", { relatedTarget: c[0], detail: f }) : a.Event("valid.bs.validator", { relatedTarget: c[0], detail: d }), e.$element.trigger(b)), e.toggleSubmit(), e.$element.trigger(a.Event("validated.bs.validator", { relatedTarget: c[0] }));
            });
        }
    }, c.prototype.runValidators = function (b) {
        function d(a) {
            return b.data(a + "-error") || b.data("error") || "native" == a && b[0].validationMessage || g.errors[a];
        }var e = [],
            f = a.Deferred(),
            g = this.options;return b.data("bs.validator.deferred") && b.data("bs.validator.deferred").reject(), b.data("bs.validator.deferred", f), a.each(c.VALIDATORS, a.proxy(function (a, c) {
            if ((b.data(a) || "native" == a) && !c.call(this, b)) {
                var f = d(a);!~e.indexOf(f) && e.push(f);
            }
        }, this)), !e.length && b.val() && b.data("remote") ? this.defer(b, function () {
            var c = {};c[b.attr("name")] = b.val(), a.get(b.data("remote"), c).fail(function (a, b, c) {
                e.push(d("remote") || c);
            }).always(function () {
                f.resolve(e);
            });
        }) : f.resolve(e), f.promise();
    }, c.prototype.validate = function () {
        var a = this.options.delay;return this.options.delay = 0, this.$element.find(c.INPUT_SELECTOR).trigger("input.bs.validator"), this.options.delay = a, this;
    }, c.prototype.showErrors = function (b) {
        var c = this.options.html ? "html" : "text";this.defer(b, function () {
            var d = b.closest(".form-group"),
                e = d.find(".help-block.with-errors"),
                f = d.find(".form-control-feedback"),
                g = b.data("bs.validator.errors");g.length && (g = a("<ul/>").addClass("list-unstyled").append(a.map(g, function (b) {
                return a("<li/>")[c](b);
            })), void 0 === e.data("bs.validator.originalContent") && e.data("bs.validator.originalContent", e.html()), e.empty().append(g), d.addClass("has-error"), f.length && f.removeClass(this.options.feedback.success) && f.addClass(this.options.feedback.error) && d.removeClass("has-success"));
        });
    }, c.prototype.clearErrors = function (a) {
        var b = a.closest(".form-group"),
            c = b.find(".help-block.with-errors"),
            d = b.find(".form-control-feedback");c.html(c.data("bs.validator.originalContent")), b.removeClass("has-error"), d.length && d.removeClass(this.options.feedback.error) && d.addClass(this.options.feedback.success) && b.addClass("has-success");
    }, c.prototype.hasErrors = function () {
        function b() {
            return !!(a(this).data("bs.validator.errors") || []).length;
        }return !!this.$element.find(c.INPUT_SELECTOR).filter(b).length;
    }, c.prototype.isIncomplete = function () {
        function b() {
            return "checkbox" === this.type ? !this.checked : "radio" === this.type ? !a('[name="' + this.name + '"]:checked').length : "" === a.trim(this.value);
        }return !!this.$element.find(c.INPUT_SELECTOR).filter("[required]").filter(b).length;
    }, c.prototype.onSubmit = function (a) {
        this.validate(), (this.isIncomplete() || this.hasErrors()) && a.preventDefault();
    }, c.prototype.toggleSubmit = function () {
        if (this.options.disable) {
            var b = a('button[type="submit"], input[type="submit"]').filter('[form="' + this.$element.attr("id") + '"]').add(this.$element.find('input[type="submit"], button[type="submit"]'));b.toggleClass("disabled", this.isIncomplete() || this.hasErrors());
        }
    }, c.prototype.defer = function (b, c) {
        return c = a.proxy(c, this), this.options.delay ? (window.clearTimeout(b.data("bs.validator.timeout")), void b.data("bs.validator.timeout", window.setTimeout(c, this.options.delay))) : c();
    }, c.prototype.destroy = function () {
        return this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator"), this.$element.find(c.INPUT_SELECTOR).off(".bs.validator").removeData(["bs.validator.errors", "bs.validator.deferred"]).each(function () {
            var b = a(this),
                c = b.data("bs.validator.timeout");window.clearTimeout(c) && b.removeData("bs.validator.timeout");
        }), this.$element.find(".help-block.with-errors").each(function () {
            var b = a(this),
                c = b.data("bs.validator.originalContent");b.removeData("bs.validator.originalContent").html(c);
        }), this.$element.find('input[type="submit"], button[type="submit"]').removeClass("disabled"), this.$element.find(".has-error").removeClass("has-error"), this;
    };var d = a.fn.validator;a.fn.validator = b, a.fn.validator.Constructor = c, a.fn.validator.noConflict = function () {
        return a.fn.validator = d, this;
    }, a(window).on("load", function () {
        a('form[data-toggle="validator"]').each(function () {
            var c = a(this);b.call(c, c.data());
        });
    });
}(jQuery);

// svg icons support ie11
(function () {
    svg4everybody();
})();

if (window.location.hash) {
    var hash = window.location.hash;

    if ($(hash).length) {
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 0, 'swing');
    }
}

// check if touch device
function isTouchDevice() {
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    var mq = function mq(query) {
        return window.matchMedia(query).matches;
    };
    if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    }
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}

if (isTouchDevice()) {
    $('body').addClass('touch-device');
}

// header
(function () {
    var header = $('.js-header'),
        burger = header.find('.js-header-burger'),
        wrapper = header.find('.js-header-wrapper'),
        link = header.find('.header__item'),
        html = $('html'),
        body = $('body');
    burger.on('click', function () {
        burger.toggleClass('active');
        wrapper.toggleClass('visible');
        html.toggleClass('no-scroll');
        body.toggleClass('no-scroll');
    });
    link.on('click', function () {
        burger.toggleClass('active');
        wrapper.toggleClass('visible');
        html.toggleClass('no-scroll');
        body.toggleClass('no-scroll');
    });
})();
/*
// carousel arrows
const navArrows = [`
    <span><svg class="icon icon-arrow-prev">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-prev"></use>
    </svg></span>`,
    `<span><svg class="icon icon-arrow-next">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-next"></use>
    </svg></span>`];

// owl carousel
$(document).ready(function(){
    const slider =  $('.js-slider-details');

    slider.owlCarousel({
        items: 3,
        nav: true,
        navElement: 'button',
        navText: navArrows,
        dots: false,
        loop: true,
        smartSpeed: 700,
        responsive: {
        	320: {
        	    items: 1
        	},
            768: {
                items: 2
            },
            1024: {
                items: 3
            }
        }
    });

    // slider.on('changed.owl.carousel', function(event) {
    //     const items = slider.find('.owl-item');
    //     items.removeClass('left');
    //     items.eq(event.item.index).prevAll().addClass('left');

    // });

    // $(document).on('click', '.owl-item', function(){
    //     itemsIndex = $(this).index();
    //     slider.trigger('to.owl.carousel', itemsIndex);
    // });

    $('.js-slider-review').owlCarousel({
        items: 1,
        nav: true,
        navElement: 'button',
        navText: navArrows,
        dots: false,
        loop: true,
        smartSpeed: 700,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
        	320: {
        	    nav: false,
        	    dots: true
        	},
            768: {
                nav: true,
                dots: false
            }
        }
    });

    $('.js-slider-cases').owlCarousel({
        items: 2,
        nav: true,
        navElement: 'button',
        navText: navArrows,
        dots: false,
        loop: true,
        smartSpeed: 700,
        responsive: {
        	320: {
        	    nav: false,
        	    dots: true,
        	    items: 1
        	},
            768: {
                nav: true,
                dots: false,
                items: 2
            }
        }
    });

});

// owl carousel
(function(){
    const slider = $('.js-owl');
    if (slider.length) {
        slider.each(function () {
            const _this = $(this),
                  itemsMobileAlbum = _this.data('items-mobile-album'),
                  itemsMobilePortrait = _this.data('items-mobile-portrait');
                  console.log(itemsMobileAlbum);
            if (itemsMobileAlbum && itemsMobilePortrait) {
                owlMobileAlbum(_this, itemsMobileAlbum, itemsMobilePortrait);
                $(window).resize(function () {
                    owlMobileAlbum(_this, itemsMobileAlbum, itemsMobilePortrait);
                });
            }
            if (!itemsMobileAlbum && itemsMobilePortrait) {
                owlMobilePortrait(_this, itemsMobilePortrait);
                $(window).resize(function () {
                    owlMobilePortrait(_this, itemsMobilePortrait);
                });
            }
        });
    }

    // mobile album
    function owlMobileAlbum (obj, itemsMobileAlbum, itemsMobilePortrait) {
        let optionLoop = true;
        if (obj.is('[data-no-loop]')) {
            optionLoop = false;
        }
        let optionAutoHeight = false;
        if (obj.is('[data-autoheight]')) {
            optionAutoHeight = true;
        }
        var fullWidth = window.innerWidth;
        if (navigator.platform.indexOf('Win') > -1) {
            var mobilePoint = 766; // windows
        } else {
            var mobilePoint = 767; // mac os
        }
        // console.log(mobilePoint); 
        if (fullWidth <= mobilePoint) {
            if (!obj.hasClass('owl-carousel')) {
                obj.addClass('owl-carousel');
                obj.owlCarousel({
                    items: itemsMobileAlbum,
                    nav: false,
                    dots: true,
                    loop: optionLoop,
                    smartSpeed: 600,
                    autoHeight: optionAutoHeight,
                    responsive: {
                        0: {
                            items: itemsMobilePortrait
                        },
                        480: {
                            items: itemsMobileAlbum
                        }
                    }
                });
            }
        }else{
            obj.removeClass('owl-carousel');
            obj.trigger('destroy.owl.carousel');
        }
    }

    // mobile portrait
    function owlMobilePortrait(obj, itemsMobilePortrait) {
        let optionLoop = true;
        if (obj.is('[data-no-loop]')) {
            optionLoop = false;
        }
        let optionAutoHeight = false;
        if (obj.is('[data-autoheight]')) {
            optionAutoHeight = true;
        }
        const windowWidth = $(window).width();
        if (windowWidth <= 479) {
            if (!obj.hasClass('owl-carousel')) {
                obj.addClass('owl-carousel');
                obj.owlCarousel({
                    items: itemsMobilePortrait,
                    nav: false,
                    dots: true,
                    smartSpeed: 600,
                    loop: optionLoop,
                    autoHeight: optionAutoHeight
                });
            }
        }else{
            obj.removeClass('owl-carousel');
            obj.trigger('destroy.owl.carousel');
        }
    }
}());
*/
// aos animation
AOS.init();

// parallax effect
(function () {
    var parallax = $('.js-parallax');
    if (parallax.length) {
        parallax.each(function () {
            var _this = $(this),
                scale = _this.data('scale'),
                orientation = _this.data('orientation'),
                delay = _this.data('delay');

            new simpleParallax(_this[0], {
                scale: scale,
                orientation: orientation,
                delay: delay,
                overflow: true,
                transition: 'ease'
            });
        });
    }
})();

// scroll to section
(function () {
    var btn = $('.js-scroll');
    btn.click(function () {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 1000
        });
        return false;
    });
})();

// form - https://formspree.io/forms/xdopwrqn/integration

window.addEventListener("DOMContentLoaded", function () {

    // get the form elements defined in your form HTML above

    var form = document.getElementById("contact-form");
    var button = document.getElementById("contact-form-button");
    var status = document.getElementById("contact-form-status");

    // Success and Error functions for after the form is submitted

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

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
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

// // set the starting position of the cursor outside of the screen
// let clientX = -100;
// let clientY = -100;
// const innerCursor = document.querySelector(".cursor");

// const initCursor = () => {
//   // add listener to track the current mouse position
//   document.addEventListener("mousemove", e => {
//     clientX = e.clientX;
//     clientY = e.clientY;
//   });

//   // transform the innerCursor to the current mouse position
//   // use requestAnimationFrame() for smooth performance
//   const render = () => {
//     innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
//     // if you are already using TweenMax in your project, you might as well
//     // use TweenMax.set() instead
//     // TweenMax.set(innerCursor, {
//     //   x: clientX,
//     //   y: clientY
//     // });

//     requestAnimationFrame(render);
//   };
//   requestAnimationFrame(render);
// };

// initCursor();