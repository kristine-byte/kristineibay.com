var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function animationEndEventName() {
  var t,
      e = document.createElement("div"),
      n = { animation: "animationend", oAnimation: "oAnimationEnd", MSAnimation: "MSAnimationEnd", mozAnimation: "mozAnimationEnd", WebkitAnimation: "webkitAnimationEnd" };for (t in n) {
    if (n.hasOwnProperty(t) && void 0 !== e.style[t]) return n[t];
  }
}!function (t) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    var e;"undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.ProgressBar = t();
  }
}(function () {
  return function t(e, n, r) {
    function i(s, a) {
      if (!n[s]) {
        if (!e[s]) {
          var u = "function" == typeof require && require;if (!a && u) return u(s, !0);if (o) return o(s, !0);var h = new Error("Cannot find module '" + s + "'");throw h.code = "MODULE_NOT_FOUND", h;
        }var f = n[s] = { exports: {} };e[s][0].call(f.exports, function (t) {
          var n = e[s][1][t];return i(n || t);
        }, f, f.exports, t, e, n, r);
      }return n[s].exports;
    }for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) {
      i(r[s]);
    }return i;
  }({ 1: [function (t, e, n) {
      !function (t) {
        "undefined" == typeof SHIFTY_DEBUG_NOW && (SHIFTY_DEBUG_NOW = function SHIFTY_DEBUG_NOW() {
          return +new Date();
        });var r = function () {
          "use strict";
          var r,
              i,
              o,
              s,
              a,
              u = "linear",
              h = 1e3 / 60,
              f = Date.now ? Date.now : function () {
            return +new Date();
          },
              l = SHIFTY_DEBUG_NOW || f;function p() {}function c(t, e) {
            var n;for (n in t) {
              Object.hasOwnProperty.call(t, n) && e(n);
            }
          }function d(t, e) {
            return c(e, function (n) {
              t[n] = e[n];
            }), t;
          }function g(t, e) {
            c(e, function (n) {
              void 0 === t[n] && (t[n] = e[n]);
            });
          }function _(t, e, n, i, o, s, a) {
            var u,
                h = (t - s) / o;for (u in e) {
              e.hasOwnProperty(u) && (e[u] = w(n[u], i[u], r[a[u]], h));
            }return e;
          }function w(t, e, n, r) {
            return t + (e - t) * n(r);
          }function m(t, e) {
            var n = x.prototype.filter,
                r = t._filterArgs;c(n, function (i) {
              void 0 !== n[i][e] && n[i][e].apply(t, r);
            });
          }function v(t, e, n, r, i, u, f, p, c) {
            o = e + n, s = Math.min(l(), o), a = s >= o, t.isPlaying() && !a ? (c(t._timeoutHandler, h), m(t, "beforeTween"), _(s, r, i, u, n, e, f), m(t, "afterTween"), p(r)) : a && (p(u), t.stop(!0));
          }function y(t, e) {
            var n = {};return c(t, "string" == typeof e ? function (t) {
              n[t] = e;
            } : function (t) {
              n[t] || (n[t] = e[t] || u);
            }), n;
          }function x(t, e) {
            this._currentState = t || {}, this._configured = !1, this._scheduleFunction = i, void 0 !== e && this.setConfig(e);
          }return i = "undefined" != typeof window && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.mozCancelRequestAnimationFrame && window.mozRequestAnimationFrame) || setTimeout, x.prototype.tween = function (t) {
            return this._isTweening ? this : (void 0 === t && this._configured || this.setConfig(t), this._start(this.get()), this.resume());
          }, x.prototype.setConfig = function (t) {
            t = t || {}, this._configured = !0, this._pausedAtTime = null, this._start = t.start || p, this._step = t.step || p, this._finish = t.finish || p, this._duration = t.duration || 500, this._currentState = t.from || this.get(), this._originalState = this.get(), this._targetState = t.to || this.get(), this._timestamp = l();var e = this._currentState,
                n = this._targetState;return g(n, e), this._easing = y(e, t.easing || u), this._filterArgs = [e, this._originalState, n, this._easing], m(this, "tweenCreated"), this;
          }, x.prototype.get = function () {
            return d({}, this._currentState);
          }, x.prototype.set = function (t) {
            this._currentState = t;
          }, x.prototype.pause = function () {
            return this._pausedAtTime = l(), this._isPaused = !0, this;
          }, x.prototype.resume = function () {
            this._isPaused && (this._timestamp += l() - this._pausedAtTime), this._isPaused = !1, this._isTweening = !0;var t = this;return this._timeoutHandler = function () {
              v(t, t._timestamp, t._duration, t._currentState, t._originalState, t._targetState, t._easing, t._step, t._scheduleFunction);
            }, this._timeoutHandler(), this;
          }, x.prototype.stop = function (t) {
            return this._isTweening = !1, this._isPaused = !1, this._timeoutHandler = p, t && (d(this._currentState, this._targetState), m(this, "afterTweenEnd"), this._finish.call(this, this._currentState)), this;
          }, x.prototype.isPlaying = function () {
            return this._isTweening && !this._isPaused;
          }, x.prototype.setScheduleFunction = function (t) {
            this._scheduleFunction = t;
          }, x.prototype.dispose = function () {
            var t;for (t in this) {
              this.hasOwnProperty(t) && delete this[t];
            }
          }, x.prototype.filter = {}, x.prototype.formula = { linear: function linear(t) {
              return t;
            } }, r = x.prototype.formula, d(x, { now: l, each: c, tweenProps: _, tweenProp: w, applyFilter: m, shallowCopy: d, defaults: g, composeEasingObject: y }), "function" == typeof SHIFTY_DEBUG_NOW && (t.timeoutHandler = v), "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? e.exports = x : void 0 === t.Tweenable && (t.Tweenable = x), x;
        }();r.shallowCopy(r.prototype.formula, { easeInQuad: function easeInQuad(t) {
            return Math.pow(t, 2);
          }, easeOutQuad: function easeOutQuad(t) {
            return -(Math.pow(t - 1, 2) - 1);
          }, easeInOutQuad: function easeInOutQuad(t) {
            return (t /= .5) < 1 ? .5 * Math.pow(t, 2) : -.5 * ((t -= 2) * t - 2);
          }, easeInCubic: function easeInCubic(t) {
            return Math.pow(t, 3);
          }, easeOutCubic: function easeOutCubic(t) {
            return Math.pow(t - 1, 3) + 1;
          }, easeInOutCubic: function easeInOutCubic(t) {
            return (t /= .5) < 1 ? .5 * Math.pow(t, 3) : .5 * (Math.pow(t - 2, 3) + 2);
          }, easeInQuart: function easeInQuart(t) {
            return Math.pow(t, 4);
          }, easeOutQuart: function easeOutQuart(t) {
            return -(Math.pow(t - 1, 4) - 1);
          }, easeInOutQuart: function easeInOutQuart(t) {
            return (t /= .5) < 1 ? .5 * Math.pow(t, 4) : -.5 * ((t -= 2) * Math.pow(t, 3) - 2);
          }, easeInQuint: function easeInQuint(t) {
            return Math.pow(t, 5);
          }, easeOutQuint: function easeOutQuint(t) {
            return Math.pow(t - 1, 5) + 1;
          }, easeInOutQuint: function easeInOutQuint(t) {
            return (t /= .5) < 1 ? .5 * Math.pow(t, 5) : .5 * (Math.pow(t - 2, 5) + 2);
          }, easeInSine: function easeInSine(t) {
            return 1 - Math.cos(t * (Math.PI / 2));
          }, easeOutSine: function easeOutSine(t) {
            return Math.sin(t * (Math.PI / 2));
          }, easeInOutSine: function easeInOutSine(t) {
            return -.5 * (Math.cos(Math.PI * t) - 1);
          }, easeInExpo: function easeInExpo(t) {
            return 0 === t ? 0 : Math.pow(2, 10 * (t - 1));
          }, easeOutExpo: function easeOutExpo(t) {
            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
          }, easeInOutExpo: function easeInOutExpo(t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t));
          }, easeInCirc: function easeInCirc(t) {
            return -(Math.sqrt(1 - t * t) - 1);
          }, easeOutCirc: function easeOutCirc(t) {
            return Math.sqrt(1 - Math.pow(t - 1, 2));
          }, easeInOutCirc: function easeInOutCirc(t) {
            return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
          }, easeOutBounce: function easeOutBounce(t) {
            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
          }, easeInBack: function easeInBack(t) {
            return t * t * (2.70158 * t - 1.70158);
          }, easeOutBack: function easeOutBack(t) {
            return (t -= 1) * t * (2.70158 * t + 1.70158) + 1;
          }, easeInOutBack: function easeInOutBack(t) {
            var e = 1.70158;return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2);
          }, elastic: function elastic(t) {
            return -1 * Math.pow(4, -8 * t) * Math.sin((6 * t - 1) * (2 * Math.PI) / 2) + 1;
          }, swingFromTo: function swingFromTo(t) {
            var e = 1.70158;return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2);
          }, swingFrom: function swingFrom(t) {
            return t * t * (2.70158 * t - 1.70158);
          }, swingTo: function swingTo(t) {
            return (t -= 1) * t * (2.70158 * t + 1.70158) + 1;
          }, bounce: function bounce(t) {
            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
          }, bouncePast: function bouncePast(t) {
            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 2 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 2 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 2 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375);
          }, easeFromTo: function easeFromTo(t) {
            return (t /= .5) < 1 ? .5 * Math.pow(t, 4) : -.5 * ((t -= 2) * Math.pow(t, 3) - 2);
          }, easeFrom: function easeFrom(t) {
            return Math.pow(t, 4);
          }, easeTo: function easeTo(t) {
            return Math.pow(t, .25);
          } }), function () {
          function t(t, e, n, r, i, o) {
            var s,
                a = 0,
                u = 0,
                h = 0,
                f = 0,
                l = 0,
                p = 0;function c(t) {
              return ((a * t + u) * t + h) * t;
            }function d(t) {
              return t >= 0 ? t : 0 - t;
            }return a = 1 - (h = 3 * e) - (u = 3 * (r - e) - h), f = 1 - (p = 3 * n) - (l = 3 * (i - n) - p), s = function (t, e) {
              var n, r, i, o, s, f, l;for (i = t, f = 0; f < 8; f++) {
                if (d(o = c(i) - t) < e) return i;if (d(s = (3 * a * (l = i) + 2 * u) * l + h) < 1e-6) break;i -= o / s;
              }if (r = 1, (i = t) < (n = 0)) return n;if (i > r) return r;for (; n < r;) {
                if (d((o = c(i)) - t) < e) return i;t > o ? n = i : r = i, i = .5 * (r - n) + n;
              }return i;
            }(t, 1 / (200 * o)), ((f * s + l) * s + p) * s;
          }r.setBezierFunction = function (e, n, i, o, s) {
            var a,
                u,
                h,
                f,
                l = (a = n, u = i, h = o, f = s, function (e) {
              return t(e, a, u, h, f, 1);
            });return l.x1 = n, l.y1 = i, l.x2 = o, l.y2 = s, r.prototype.formula[e] = l;
          }, r.unsetBezierFunction = function (t) {
            delete r.prototype.formula[t];
          };
        }(), function () {
          var t = new r();t._filterArgs = [], r.interpolate = function (e, n, i, o) {
            var s = r.shallowCopy({}, e),
                a = r.composeEasingObject(e, o || "linear");t.set({});var u = t._filterArgs;u.length = 0, u[0] = s, u[1] = e, u[2] = n, u[3] = a, r.applyFilter(t, "tweenCreated"), r.applyFilter(t, "beforeTween");var h,
                f,
                l,
                p,
                c,
                d = (h = e, f = s, l = n, p = i, c = a, r.tweenProps(p, f, h, l, 1, 0, c));return r.applyFilter(t, "afterTween"), d;
          };
        }(), function (t) {
          var e = /(\d|\-|\.)/,
              n = /([^\-0-9\.]+)/g,
              r = /[0-9.\-]+/g,
              i = new RegExp("rgb\\(" + r.source + /,\s*/.source + r.source + /,\s*/.source + r.source + "\\)", "g"),
              o = /^.*\(/,
              s = /#([0-9]|[a-f]){3,6}/gi,
              a = "VAL",
              u = [];function h(e) {
            t.each(e, function (t) {
              var n = e[t];"string" == typeof n && n.match(s) && (e[t] = c(s, n, f));
            });
          }function f(t) {
            var e = function (t) {
              3 === (t = t.replace(/#/, "")).length && (t = (t = t.split(""))[0] + t[0] + t[1] + t[1] + t[2] + t[2]);return l[0] = p(t.substr(0, 2)), l[1] = p(t.substr(2, 2)), l[2] = p(t.substr(4, 2)), l;
            }(t);return "rgb(" + e[0] + "," + e[1] + "," + e[2] + ")";
          }var l = [];function p(t) {
            return parseInt(t, 16);
          }function c(t, e, n) {
            var r = e.match(t),
                i = e.replace(t, a);if (r) for (var o, s = r.length, u = 0; u < s; u++) {
              o = r.shift(), i = i.replace(a, n(o));
            }return i;
          }function d(t) {
            for (var e = t.match(r), n = e.length, i = t.match(o)[0], s = 0; s < n; s++) {
              i += parseInt(e[s], 10) + ",";
            }return i = i.slice(0, -1) + ")";
          }function g(r) {
            var i = {};return t.each(r, function (t) {
              var o,
                  s,
                  h = r[t];if ("string" == typeof h) {
                var f = v(h);i[t] = { formatString: (o = h, s = o.match(n), s ? (1 === s.length || o[0].match(e)) && s.unshift("") : s = ["", ""], s.join(a)), chunkNames: function (t, e) {
                    u.length = 0;var n,
                        r = t.length;for (n = 0; n < r; n++) {
                      u.push("_" + e + "_" + n);
                    }return u;
                  }(f, t) };
              }
            }), i;
          }function _(e, n) {
            t.each(n, function (t) {
              for (var r = v(e[t]), i = r.length, o = 0; o < i; o++) {
                e[n[t].chunkNames[o]] = +r[o];
              }delete e[t];
            });
          }function w(e, n) {
            t.each(n, function (t) {
              var r = e[t],
                  o = function (t, e) {
                m.length = 0;for (var n = e.length, r = 0; r < n; r++) {
                  m.push(t[e[r]]);
                }return m;
              }(function (t, e) {
                for (var n, r = {}, i = e.length, o = 0; o < i; o++) {
                  n = e[o], r[n] = t[n], delete t[n];
                }return r;
              }(e, n[t].chunkNames), n[t].chunkNames);r = function (t, e) {
                for (var n = t, r = e.length, i = 0; i < r; i++) {
                  n = n.replace(a, +e[i].toFixed(4));
                }return n;
              }(n[t].formatString, o), e[t] = c(i, r, d);
            });
          }var m = [];function v(t) {
            return t.match(r);
          }t.prototype.filter.token = { tweenCreated: function tweenCreated(t, e, n, r) {
              h(t), h(e), h(n), this._tokenData = g(t);
            }, beforeTween: function beforeTween(e, n, r, i) {
              var o, s;o = i, s = this._tokenData, t.each(s, function (t) {
                for (var e = s[t].chunkNames, n = e.length, r = o[t].split(" "), i = r[r.length - 1], a = 0; a < n; a++) {
                  o[e[a]] = r[a] || i;
                }delete o[t];
              }), _(e, this._tokenData), _(n, this._tokenData), _(r, this._tokenData);
            }, afterTween: function afterTween(e, n, r, i) {
              var o, s;w(e, this._tokenData), w(n, this._tokenData), w(r, this._tokenData), o = i, s = this._tokenData, t.each(s, function (t) {
                for (var e = s[t].chunkNames, n = e.length, r = "", i = 0; i < n; i++) {
                  r += " " + o[e[i]], delete o[e[i]];
                }o[t] = r.substr(1);
              });
            } };
        }(r);
      }(this);
    }, {}], 2: [function (t, e, n) {
      var r = t("./progress"),
          i = t("./utils"),
          o = function o(t, e) {
        this._pathTemplate = "M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}", r.apply(this, arguments);
      };(o.prototype = new r()).constructor = o, o.prototype._pathString = function (t) {
        var e = 50 - t.strokeWidth / 2;return i.render(this._pathTemplate, { radius: e, "2radius": 2 * e });
      }, o.prototype._trailString = function (t) {
        return this._pathString(t);
      }, e.exports = o;
    }, { "./progress": 6, "./utils": 8 }], 3: [function (t, e, n) {
      var r = t("./progress"),
          i = t("./utils"),
          o = function o(t, e) {
        this._pathTemplate = "M 0,{center} L 100,{center}", r.apply(this, arguments);
      };(o.prototype = new r()).constructor = o, o.prototype._initializeSvg = function (t, e) {
        t.setAttribute("viewBox", "0 0 100 " + e.strokeWidth), t.setAttribute("preserveAspectRatio", "none");
      }, o.prototype._pathString = function (t) {
        return i.render(this._pathTemplate, { center: t.strokeWidth / 2 });
      }, o.prototype._trailString = function (t) {
        return this._pathString(t);
      }, e.exports = o;
    }, { "./progress": 6, "./utils": 8 }], 4: [function (t, e, n) {
      var r = t("./line"),
          i = t("./circle"),
          o = t("./square"),
          s = t("./path");e.exports = { Line: r, Circle: i, Square: o, Path: s };
    }, { "./circle": 2, "./line": 3, "./path": 5, "./square": 7 }], 5: [function (t, e, n) {
      var r = t("shifty"),
          i = t("./utils"),
          o = { easeIn: "easeInCubic", easeOut: "easeOutCubic", easeInOut: "easeInOutCubic" },
          s = function s(t, e) {
        e = i.extend({ duration: 800, easing: "linear", from: {}, to: {}, step: function step() {} }, e), this._path = t, this._opts = e, this._tweenable = null;var n = this._path.getTotalLength();this._path.style.strokeDasharray = n + " " + n, this._path.style.strokeDashoffset = n;
      };s.prototype.value = function () {
        var t = this._getComputedDashOffset(),
            e = this._path.getTotalLength();return parseFloat((1 - t / e).toFixed(6), 10);
      }, s.prototype.set = function (t) {
        this.stop(), this._path.style.strokeDashoffset = this._progressToOffset(t);var e = this._opts.step;i.isFunction(e) && e(this._calculateTo(t, "linear"), this._opts.attachment || this);
      }, s.prototype.stop = function () {
        this._stopTween(), this._path.style.strokeDashoffset = this._getComputedDashOffset();
      }, s.prototype.animate = function (t, e, n) {
        e = e || {}, i.isFunction(e) && (n = e, e = {});var o = i.extend({}, e),
            s = i.extend({}, this._opts);e = i.extend(s, e);var a = this._easing(e.easing),
            u = this._resolveFromAndTo(t, a, o);this.stop(), this._path.getBoundingClientRect();var h = this._getComputedDashOffset(),
            f = this._progressToOffset(t),
            l = this;this._tweenable = new r(), this._tweenable.tween({ from: i.extend({ offset: h }, u.from), to: i.extend({ offset: f }, u.to), duration: e.duration, easing: a, step: function step(t) {
            l._path.style.strokeDashoffset = t.offset, e.step(t, e.attachment);
          }, finish: function finish(t) {
            l._path.style.strokeDashoffset = t.offset, e.step(t, e.attachment), i.isFunction(n) && n();
          } });
      }, s.prototype._getComputedDashOffset = function () {
        var t = window.getComputedStyle(this._path, null);return parseFloat(t.getPropertyValue("stroke-dashoffset"), 10);
      }, s.prototype._progressToOffset = function (t) {
        var e = this._path.getTotalLength();return e - t * e;
      }, s.prototype._resolveFromAndTo = function (t, e, n) {
        return n.from && n.to ? { from: n.from, to: n.to } : { from: this._calculateFrom(e), to: this._calculateTo(t, e) };
      }, s.prototype._calculateFrom = function (t) {
        return r.interpolate(this._opts.from, this._opts.to, this.value(), t);
      }, s.prototype._calculateTo = function (t, e) {
        return r.interpolate(this._opts.from, this._opts.to, t, e);
      }, s.prototype._stopTween = function () {
        null !== this._tweenable && (this._tweenable.stop(), this._tweenable.dispose(), this._tweenable = null);
      }, s.prototype._easing = function (t) {
        return o.hasOwnProperty(t) ? o[t] : t;
      }, e.exports = s;
    }, { "./utils": 8, shifty: 1 }], 6: [function (t, e, n) {
      var r = t("./path"),
          i = t("./utils"),
          o = "Object is destroyed",
          s = function t(e, n) {
        if (!(this instanceof t)) throw new Error("Constructor was called without new keyword");if (0 !== arguments.length) {
          this._opts = i.extend({ color: "#555", strokeWidth: 1, trailColor: null, trailWidth: null, fill: null, text: { autoStyle: !0, color: null, value: "", className: "progressbar-text" } }, n, !0);var o,
              s = this._createSvgView(this._opts);if (!(o = i.isString(e) ? document.querySelector(e) : e)) throw new Error("Container does not exist: " + e);this._container = o, this._container.appendChild(s.svg), this.text = null, this._opts.text.value && (this.text = this._createTextElement(this._opts, this._container), this._container.appendChild(this.text));var a = i.extend({ attachment: this }, this._opts);this._progressPath = new r(s.path, a), this.svg = s.svg, this.path = s.path, this.trail = s.trail;
        }
      };s.prototype.animate = function (t, e, n) {
        if (null === this._progressPath) throw new Error(o);this._progressPath.animate(t, e, n);
      }, s.prototype.stop = function () {
        if (null === this._progressPath) throw new Error(o);this._progressPath.stop();
      }, s.prototype.destroy = function () {
        if (null === this._progressPath) throw new Error(o);this.stop(), this.svg.parentNode.removeChild(this.svg), this.svg = null, this.path = null, this.trail = null, this._progressPath = null, null !== this.text && (this.text.parentNode.removeChild(this.text), this.text = null);
      }, s.prototype.set = function (t) {
        if (null === this._progressPath) throw new Error(o);this._progressPath.set(t);
      }, s.prototype.value = function () {
        if (null === this._progressPath) throw new Error(o);return this._progressPath.value();
      }, s.prototype.setText = function (t) {
        if (null === this._progressPath) throw new Error(o);if (null === this.text) return this.text = this._createTextElement(this._opts, this._container), void this._container.appendChild(this.text);this.text.removeChild(this.text.firstChild), this.text.appendChild(document.createTextNode(t));
      }, s.prototype._createSvgView = function (t) {
        var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");this._initializeSvg(e, t);var n = null;(t.trailColor || t.trailWidth) && (n = this._createTrail(t), e.appendChild(n));var r = this._createPath(t);return e.appendChild(r), { svg: e, path: r, trail: n };
      }, s.prototype._initializeSvg = function (t, e) {
        t.setAttribute("viewBox", "0 0 100 100");
      }, s.prototype._createPath = function (t) {
        var e = this._pathString(t);return this._createPathElement(e, t);
      }, s.prototype._createTrail = function (t) {
        var e = this._trailString(t),
            n = i.extend({}, t);return n.trailColor || (n.trailColor = "#eee"), n.trailWidth || (n.trailWidth = n.strokeWidth), n.color = n.trailColor, n.strokeWidth = n.trailWidth, n.fill = null, this._createPathElement(e, n);
      }, s.prototype._createPathElement = function (t, e) {
        var n = document.createElementNS("http://www.w3.org/2000/svg", "path");return n.setAttribute("d", t), n.setAttribute("stroke", e.color), n.setAttribute("stroke-width", e.strokeWidth), e.fill ? n.setAttribute("fill", e.fill) : n.setAttribute("fill-opacity", "0"), n;
      }, s.prototype._createTextElement = function (t, e) {
        var n = document.createElement("p");return n.appendChild(document.createTextNode(t.text.value)), t.text.autoStyle && (e.style.position = "relative", n.style.position = "absolute", n.style.top = "50%", n.style.left = "50%", n.style.padding = 0, n.style.margin = 0, i.setStyle(n, "transform", "translate(-50%, -50%"), t.text.color ? n.style.color = t.text.color : n.style.color = t.color), n.className = t.text.className, n;
      }, s.prototype._pathString = function (t) {
        throw new Error("Override this function for each progress bar");
      }, s.prototype._trailString = function (t) {
        throw new Error("Override this function for each progress bar");
      }, e.exports = s;
    }, { "./path": 5, "./utils": 8 }], 7: [function (t, e, n) {
      var r = t("./progress"),
          i = t("./utils"),
          o = function o(t, e) {
        this._pathTemplate = "M 0,{halfOfStrokeWidth} L {width},{halfOfStrokeWidth} L {width},{width} L {halfOfStrokeWidth},{width} L {halfOfStrokeWidth},{strokeWidth}", this._trailTemplate = "M {startMargin},{halfOfStrokeWidth} L {width},{halfOfStrokeWidth} L {width},{width} L {halfOfStrokeWidth},{width} L {halfOfStrokeWidth},{halfOfStrokeWidth}", r.apply(this, arguments);
      };(o.prototype = new r()).constructor = o, o.prototype._pathString = function (t) {
        var e = 100 - t.strokeWidth / 2;return i.render(this._pathTemplate, { width: e, strokeWidth: t.strokeWidth, halfOfStrokeWidth: t.strokeWidth / 2 });
      }, o.prototype._trailString = function (t) {
        var e = 100 - t.strokeWidth / 2;return i.render(this._trailTemplate, { width: e, strokeWidth: t.strokeWidth, halfOfStrokeWidth: t.strokeWidth / 2, startMargin: t.strokeWidth / 2 - t.trailWidth / 2 });
      }, e.exports = o;
    }, { "./progress": 6, "./utils": 8 }], 8: [function (t, e, n) {
      var r = "webkit moz o ms".split(" ");function i(t) {
        return t.charAt(0).toUpperCase() + t.slice(1);
      }function o(t) {
        return e = t, "[object Array]" !== Object.prototype.toString.call(e) && "object" === (typeof t === "undefined" ? "undefined" : _typeof(t)) && !!t;var e;
      }e.exports = { extend: function t(e, n, r) {
          e = e || {}, n = n || {}, r = r || !1;for (var i in n) {
            if (n.hasOwnProperty(i)) {
              var s = e[i],
                  a = n[i];r && o(s) && o(a) ? e[i] = t(s, a, r) : e[i] = a;
            }
          }return e;
        }, render: function render(t, e) {
          var n = t;for (var r in e) {
            if (e.hasOwnProperty(r)) {
              var i = e[r],
                  o = new RegExp("\\{" + r + "\\}", "g");n = n.replace(o, i);
            }
          }return n;
        }, setStyle: function setStyle(t, e, n) {
          for (var o = 0; o < r.length; ++o) {
            var s = i(r[o]);t.style[s + i(e)] = n;
          }t.style[e] = n;
        }, capitalize: i, isString: function isString(t) {
          return "string" == typeof t || t instanceof String;
        }, isFunction: function isFunction(t) {
          return "function" == typeof t;
        }, isObject: o };
    }, {}] }, {}, [4])(4);
}), function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = t(require("jquery")) : t(jQuery);
}(function (t) {
  function e() {
    if (o.length) {
      var e = 0,
          i = t.map(o, function (t) {
        var e = t.data.selector,
            n = t.$element;return e ? n.find(e) : n;
      });for (n = n || (d = void 0, g = void 0, _ = void 0, (_ = { height: a.innerHeight, width: a.innerWidth }).height || ((d = s.compatMode) || !t.support.boxModel) && (_ = { height: (g = "CSS1Compat" === d ? u : s.body).clientHeight, width: g.clientWidth }), _), r = r || { top: a.pageYOffset || u.scrollTop || s.body.scrollTop, left: a.pageXOffset || u.scrollLeft || s.body.scrollLeft }; e < o.length; e++) {
        if (t.contains(u, i[e][0])) {
          var h = t(i[e]),
              f = h[0].offsetHeight,
              l = h[0].offsetWidth,
              p = h.offset(),
              c = h.data("inview");if (!r || !n) return;p.top + f > r.top && p.top < r.top + n.height && p.left + l > r.left && p.left < r.left + n.width ? c || h.data("inview", !0).trigger("inview", [!0]) : c && h.data("inview", !1).trigger("inview", [!1]);
        }
      }
    }var d, g, _;
  }var n,
      r,
      i,
      o = [],
      s = document,
      a = window,
      u = s.documentElement;t.event.special.inview = { add: function add(n) {
      o.push({ data: n, $element: t(this), element: this }), !i && o.length && (i = setInterval(e, 250));
    }, remove: function remove(t) {
      for (var e = 0; e < o.length; e++) {
        var n = o[e];if (n.element === this && n.data.guid === t.guid) {
          o.splice(e, 1);break;
        }
      }o.length || (clearInterval(i), i = null);
    } }, t(a).bind("scroll resize scrollstop", function () {
    n = r = null;
  }), !u.addEventListener && u.attachEvent && u.attachEvent("onfocusin", function () {
    r = null;
  });
}), $(document).ready(function () {
  var t = document.querySelectorAll(".mh-progress");Array.prototype.forEach.call(t, function (e, n) {
    var r,
        i = e.getAttribute("data-progress");r = $(e).hasClass("progress-line") ? new ProgressBar.Line(t[n], { strokeWidth: 5, easing: "easeInOut", trailWidth: 5, text: { value: "0", style: {} }, svgStyle: { width: "100%", height: "100%" }, step: function step(t, e) {
        e.setText((100 * e.value()).toFixed(0) + "%");
      } }) : new ProgressBar.Circle(t[n], { strokeWidth: 5, easing: "easeInOut", trailWidth: 5, text: { value: "0" }, step: function step(t, e) {
        e.setText((100 * e.value()).toFixed(0) + "%");
      } }), $(e).bind("inview", function (t, n) {
      n && ($(e).hasClass("active") || (r.animate(i / 100), $(e).addClass("active")));
    });
  });
});