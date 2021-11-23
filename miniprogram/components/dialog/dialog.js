var t = require("../../@babel/runtime/helpers/typeof");

module.exports = function(e) {
    var n = {};
    function r(t) {
        if (n[t]) return n[t].exports;
        var o = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
    }
    return r.m = e, r.c = n, r.d = function(t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        });
    }, r.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, r.t = function(e, n) {
        if (1 & n && (e = r(e)), 8 & n) return e;
        if (4 & n && "object" === t(e) && e && e.__esModule) return e;
        var o = Object.create(null);
        if (r.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }), 2 & n && "string" != typeof e) for (var a in e) r.d(o, a, function(t) {
            return e[t];
        }.bind(null, a));
        return o;
    }, r.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return r.d(e, "a", e), e;
    }, r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, r.p = "", r(r.s = 20);
}({
    20: function(t, e, n) {
        Component({
            options: {
                multipleSlots: !0,
                addGlobalClass: !0
            },
            properties: {
                title: {
                    type: String,
                    value: ""
                },
                extClass: {
                    type: String,
                    value: ""
                },
                maskClosable: {
                    type: Boolean,
                    value: !0
                },
                mask: {
                    type: Boolean,
                    value: !0
                },
                show: {
                    type: Boolean,
                    value: !1,
                    observer: "_showChange"
                },
                buttons: {
                    type: Array,
                    value: []
                }
            },
            data: {
                innerShow: !1
            },
            ready: function() {
                var t = this.data.buttons, e = t.length;
                t.forEach(function(t, n) {
                    t.className = 1 === e ? "weui-dialog__btn_primary" : 0 === n ? "weui-dialog__btn_default" : "weui-dialog__btn_primary";
                }), this.setData({
                    buttons: t
                });
            },
            methods: {
                buttonTap: function(t) {
                    var e = t.currentTarget.dataset.index;
                    this.triggerEvent("buttontap", {
                        index: e,
                        item: this.data.buttons[e]
                    }, {});
                },
                close: function() {
                    this.data.maskClosable && (this.setData({
                        show: !1
                    }), this.triggerEvent("close", {}, {}));
                },
                stopEvent: function() {}
            }
        });
    }
});