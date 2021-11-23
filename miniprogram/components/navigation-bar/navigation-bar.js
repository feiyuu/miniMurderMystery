var t = require("../../@babel/runtime/helpers/typeof");

module.exports = function(e) {
    var n = {};
    function a(t) {
        if (n[t]) return n[t].exports;
        var o = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(o.exports, o, o.exports, a), o.l = !0, o.exports;
    }
    return a.m = e, a.c = n, a.d = function(t, e, n) {
        a.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        });
    }, a.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, a.t = function(e, n) {
        if (1 & n && (e = a(e)), 8 & n) return e;
        if (4 & n && "object" === t(e) && e && e.__esModule) return e;
        var o = Object.create(null);
        if (a.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }), 2 & n && "string" != typeof e) for (var i in e) a.d(o, i, function(t) {
            return e[t];
        }.bind(null, i));
        return o;
    }, a.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return a.d(e, "a", e), e;
    }, a.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, a.p = "", a(a.s = 3);
}({
    3: function(t, e, n) {
        Component({
            options: {
                multipleSlots: !0,
                addGlobalClass: !0
            },
            properties: {
                extClass: {
                    type: String,
                    value: ""
                },
                title: {
                    type: String,
                    value: ""
                },
                background: {
                    type: String,
                    value: ""
                },
                color: {
                    type: String,
                    value: ""
                },
                back: {
                    type: Boolean,
                    value: !0
                },
                loading: {
                    type: Boolean,
                    value: !1
                },
                animated: {
                    type: Boolean,
                    value: !0
                },
                show: {
                    type: Boolean,
                    value: !0,
                    observer: "_showChange"
                },
                delta: {
                    type: Number,
                    value: 1
                }
            },
            data: {
                displayStyle: ""
            },
            attached: function() {
                var t = this, e = !!wx.getMenuButtonBoundingClientRect, n = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
                wx.getSystemInfo({
                    success: function(a) {
                        var o = !!(a.system.toLowerCase().search("ios") + 1);
                        t.setData({
                            ios: o,
                            statusBarHeight: a.statusBarHeight,
                            innerWidth: e ? "width:" + n.left + "px" : "",
                            innerPaddingRight: e ? "padding-right:" + (a.windowWidth - n.left) + "px" : "",
                            leftWidth: e ? "width:" + (a.windowWidth - n.left) + "px" : ""
                        });
                    }
                });
            },
            methods: {
                _showChange: function(t) {
                    var e = "";
                    e = this.data.animated ? "opacity: " + (t ? "1" : "0") + ";-webkit-transition:opacity 0.5s;transition:opacity 0.5s;" : "display: " + (t ? "" : "none"), 
                    this.setData({
                        displayStyle: e
                    });
                },
                back: function() {
                    var t = this.data;
                    wx.navigateBack({
                        delta: t.delta
                    }), this.triggerEvent("back", {
                        delta: t.delta
                    }, {});
                }
            }
        });
    }
});