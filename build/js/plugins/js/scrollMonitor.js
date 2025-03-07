var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = e() : "function" == typeof define && define.amd ? define("scrollMonitor", [], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.scrollMonitor = e() : t.scrollMonitor = e();
}(this, function () {
  return function (t) {
    function e(o) {
      if (i[o]) return i[o].exports;var s = i[o] = { exports: {}, id: o, loaded: !1 };return t[o].call(s.exports, s, s.exports, e), s.loaded = !0, s.exports;
    }var i = {};return e.m = t, e.c = i, e.p = "", e(0);
  }([function (t, e, i) {
    "use strict";
    var o = i(1),
        s = o.isInBrowser,
        n = i(2),
        r = new n(s ? document.body : null);r.setStateFromDOM(null), r.listenToDOM(), s && (window.scrollMonitor = r), t.exports = r;
  }, function (t, e) {
    "use strict";
    e.VISIBILITYCHANGE = "visibilityChange", e.ENTERVIEWPORT = "enterViewport", e.FULLYENTERVIEWPORT = "fullyEnterViewport", e.EXITVIEWPORT = "exitViewport", e.PARTIALLYEXITVIEWPORT = "partiallyExitViewport", e.LOCATIONCHANGE = "locationChange", e.STATECHANGE = "stateChange", e.eventTypes = [e.VISIBILITYCHANGE, e.ENTERVIEWPORT, e.FULLYENTERVIEWPORT, e.EXITVIEWPORT, e.PARTIALLYEXITVIEWPORT, e.LOCATIONCHANGE, e.STATECHANGE], e.isOnServer = "undefined" == typeof window, e.isInBrowser = !e.isOnServer, e.defaultOffsets = { top: 0, bottom: 0 };
  }, function (t, e, i) {
    "use strict";
    function o(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }function s(t) {
      return c ? 0 : t === document.body ? window.innerHeight || document.documentElement.clientHeight : t.clientHeight;
    }function n(t) {
      return c ? 0 : t === document.body ? Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight) : t.scrollHeight;
    }function r(t) {
      return c ? 0 : t === document.body ? window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop;
    }var h = i(1),
        c = h.isOnServer,
        a = h.isInBrowser,
        l = h.eventTypes,
        p = i(3),
        u = function () {
      function t(e, i) {
        function h() {
          if (a.viewportTop = r(e), a.viewportBottom = a.viewportTop + a.viewportHeight, a.documentHeight = n(e), a.documentHeight !== p) {
            for (u = a.watchers.length; u--;) {
              a.watchers[u].recalculateLocation();
            }p = a.documentHeight;
          }
        }function c() {
          for (w = a.watchers.length; w--;) {
            a.watchers[w].update();
          }for (w = a.watchers.length; w--;) {
            a.watchers[w].triggerCallbacks();
          }
        }o(this, t);var a = this;this.item = e, this.watchers = [], this.viewportTop = null, this.viewportBottom = null, this.documentHeight = n(e), this.viewportHeight = s(e), this.DOMListener = function () {
          t.prototype.DOMListener.apply(a, arguments);
        }, this.eventTypes = l, i && (this.containerWatcher = i.create(e));var p, u, w;this.update = function () {
          h(), c();
        }, this.recalculateLocations = function () {
          this.documentHeight = 0, this.update();
        };
      }return t.prototype.listenToDOM = function () {
        a && (window.addEventListener ? (this.item === document.body ? window.addEventListener("scroll", this.DOMListener) : this.item.addEventListener("scroll", this.DOMListener), window.addEventListener("resize", this.DOMListener)) : (this.item === document.body ? window.attachEvent("onscroll", this.DOMListener) : this.item.attachEvent("onscroll", this.DOMListener), window.attachEvent("onresize", this.DOMListener)), this.destroy = function () {
          window.addEventListener ? (this.item === document.body ? (window.removeEventListener("scroll", this.DOMListener), this.containerWatcher.destroy()) : this.item.removeEventListener("scroll", this.DOMListener), window.removeEventListener("resize", this.DOMListener)) : (this.item === document.body ? (window.detachEvent("onscroll", this.DOMListener), this.containerWatcher.destroy()) : this.item.detachEvent("onscroll", this.DOMListener), window.detachEvent("onresize", this.DOMListener));
        });
      }, t.prototype.destroy = function () {}, t.prototype.DOMListener = function (t) {
        this.setStateFromDOM(t), this.updateAndTriggerWatchers(t);
      }, t.prototype.setStateFromDOM = function (t) {
        var e = r(this.item),
            i = s(this.item),
            o = n(this.item);this.setState(e, i, o, t);
      }, t.prototype.setState = function (t, e, i, o) {
        var s = e !== this.viewportHeight || i !== this.contentHeight;if (this.latestEvent = o, this.viewportTop = t, this.viewportHeight = e, this.viewportBottom = t + e, this.contentHeight = i, s) for (var n = this.watchers.length; n--;) {
          this.watchers[n].recalculateLocation();
        }this.updateAndTriggerWatchers(o);
      }, t.prototype.updateAndTriggerWatchers = function (t) {
        for (var e = this.watchers.length; e--;) {
          this.watchers[e].update();
        }for (e = this.watchers.length; e--;) {
          this.watchers[e].triggerCallbacks(t);
        }
      }, t.prototype.createCustomContainer = function () {
        return new t();
      }, t.prototype.createContainer = function (e) {
        "string" == typeof e ? e = document.querySelector(e) : e && e.length > 0 && (e = e[0]);var i = new t(e, this);return i.setStateFromDOM(), i.listenToDOM(), i;
      }, t.prototype.create = function (t, e) {
        "string" == typeof t ? t = document.querySelector(t) : t && t.length > 0 && (t = t[0]);var i = new p(this, t, e);return this.watchers.push(i), i;
      }, t.prototype.beget = function (t, e) {
        return this.create(t, e);
      }, t;
    }();t.exports = u;
  }, function (t, e, i) {
    "use strict";
    function o(t, e, i) {
      function o(t, e) {
        if (0 !== t.length) for (E = t.length; E--;) {
          T = t[E], T.callback.call(s, e, s), T.isOne && t.splice(E, 1);
        }
      }var s = this;this.watchItem = e, this.container = t, i ? i === +i ? this.offsets = { top: i, bottom: i } : this.offsets = { top: i.top || w.top, bottom: i.bottom || w.bottom } : this.offsets = w, this.callbacks = {};for (var d = 0, f = u.length; d < f; d++) {
        s.callbacks[u[d]] = [];
      }this.locked = !1;var m, v, b, I, E, T;this.triggerCallbacks = function (t) {
        switch (this.isInViewport && !m && o(this.callbacks[r], t), this.isFullyInViewport && !v && o(this.callbacks[h], t), this.isAboveViewport !== b && this.isBelowViewport !== I && (o(this.callbacks[n], t), v || this.isFullyInViewport || (o(this.callbacks[h], t), o(this.callbacks[a], t)), m || this.isInViewport || (o(this.callbacks[r], t), o(this.callbacks[c], t))), !this.isFullyInViewport && v && o(this.callbacks[a], t), !this.isInViewport && m && o(this.callbacks[c], t), this.isInViewport !== m && o(this.callbacks[n], t), !0) {case m !== this.isInViewport:case v !== this.isFullyInViewport:case b !== this.isAboveViewport:case I !== this.isBelowViewport:
            o(this.callbacks[p], t);}m = this.isInViewport, v = this.isFullyInViewport, b = this.isAboveViewport, I = this.isBelowViewport;
      }, this.recalculateLocation = function () {
        if (!this.locked) {
          var t = this.top,
              e = this.bottom;if (this.watchItem.nodeName) {
            var i = this.watchItem.style.display;"none" === i && (this.watchItem.style.display = "");for (var s = 0, n = this.container; n.containerWatcher;) {
              s += n.containerWatcher.top - n.containerWatcher.container.viewportTop, n = n.containerWatcher.container;
            }var r = this.watchItem.getBoundingClientRect();this.top = r.top + this.container.viewportTop - s, this.bottom = r.bottom + this.container.viewportTop - s, "none" === i && (this.watchItem.style.display = i);
          } else this.watchItem === +this.watchItem ? this.watchItem > 0 ? this.top = this.bottom = this.watchItem : this.top = this.bottom = this.container.documentHeight - this.watchItem : (this.top = this.watchItem.top, this.bottom = this.watchItem.bottom);this.top -= this.offsets.top, this.bottom += this.offsets.bottom, this.height = this.bottom - this.top, void 0 === t && void 0 === e || this.top === t && this.bottom === e || o(this.callbacks[l], null);
        }
      }, this.recalculateLocation(), this.update(), m = this.isInViewport, v = this.isFullyInViewport, b = this.isAboveViewport, I = this.isBelowViewport;
    }var s = i(1),
        n = s.VISIBILITYCHANGE,
        r = s.ENTERVIEWPORT,
        h = s.FULLYENTERVIEWPORT,
        c = s.EXITVIEWPORT,
        a = s.PARTIALLYEXITVIEWPORT,
        l = s.LOCATIONCHANGE,
        p = s.STATECHANGE,
        u = s.eventTypes,
        w = s.defaultOffsets;o.prototype = { on: function on(t, e, i) {
        switch (!0) {case t === n && !this.isInViewport && this.isAboveViewport:case t === r && this.isInViewport:case t === h && this.isFullyInViewport:case t === c && this.isAboveViewport && !this.isInViewport:case t === a && this.isAboveViewport:
            if (e.call(this, this.container.latestEvent, this), i) return;}if (!this.callbacks[t]) throw new Error("Tried to add a scroll monitor listener of type " + t + ". Your options are: " + u.join(", "));this.callbacks[t].push({ callback: e, isOne: i || !1 });
      }, off: function off(t, e) {
        if (!this.callbacks[t]) throw new Error("Tried to remove a scroll monitor listener of type " + t + ". Your options are: " + u.join(", "));for (var i, o = 0; i = this.callbacks[t][o]; o++) {
          if (i.callback === e) {
            this.callbacks[t].splice(o, 1);break;
          }
        }
      }, one: function one(t, e) {
        this.on(t, e, !0);
      }, recalculateSize: function recalculateSize() {
        this.height = this.watchItem.offsetHeight + this.offsets.top + this.offsets.bottom, this.bottom = this.top + this.height;
      }, update: function update() {
        this.isAboveViewport = this.top < this.container.viewportTop, this.isBelowViewport = this.bottom > this.container.viewportBottom, this.isInViewport = this.top < this.container.viewportBottom && this.bottom > this.container.viewportTop, this.isFullyInViewport = this.top >= this.container.viewportTop && this.bottom <= this.container.viewportBottom || this.isAboveViewport && this.isBelowViewport;
      }, destroy: function destroy() {
        var t = this.container.watchers.indexOf(this),
            e = this;this.container.watchers.splice(t, 1);for (var i = 0, o = u.length; i < o; i++) {
          e.callbacks[u[i]].length = 0;
        }
      }, lock: function lock() {
        this.locked = !0;
      }, unlock: function unlock() {
        this.locked = !1;
      } };for (var d = function d(t) {
      return function (e, i) {
        this.on.call(this, t, e, i);
      };
    }, f = 0, m = u.length; f < m; f++) {
      var v = u[f];o.prototype[v] = d(v);
    }t.exports = o;
  }]);
});
//# sourceMappingURL=scrollMonitor.js.map