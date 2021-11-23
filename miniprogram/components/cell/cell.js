var e = require("../../@babel/runtime/helpers/typeof");

module.exports = function(t) {
    var r = {};
    function n(e) {
        if (r[e]) return r[e].exports;
        var o = r[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }
    return n.m = t, n.c = r, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        });
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, n.t = function(t, r) {
        if (1 & r && (t = n(t)), 8 & r) return t;
        if (4 & r && "object" === e(t) && t && t.__esModule) return t;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: t
        }), 2 & r && "string" != typeof t) for (var a in t) n.d(o, a, function(e) {
            return t[e];
        }.bind(null, a));
        return o;
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return n.d(t, "a", t), t;
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 9);
}({
    9: function(e, t, r) {
        Component({
            options: {
                addGlobalClass: !0,
                multipleSlots: !0
            },
            properties: {
                hover: {
                    type: Boolean,
                    value: !1
                },
                link: {
                    type: Boolean,
                    value: !1
                },
                extClass: {
                    type: String,
                    value: ""
                },
                iconClass: {
                    type: String,
                    value: ""
                },
                bodyClass: {
                    type: String,
                    value: ""
                },
                icon: {
                    type: String,
                    value: ""
                },
                title: {
                    type: String,
                    value: ""
                },
                value: {
                    type: String,
                    value: ""
                },
                showError: {
                    type: Boolean,
                    value: !1
                },
                prop: {
                    type: String,
                    value: ""
                },
                url: {
                    type: String,
                    value: ""
                },
                footerClass: {
                    type: String,
                    value: ""
                },
                footer: {
                    type: String,
                    value: ""
                },
                inline: {
                    type: Boolean,
                    value: !0
                },
                hasHeader: {
                    type: Boolean,
                    value: !0
                },
                hasFooter: {
                    type: Boolean,
                    value: !0
                },
                hasBody: {
                    type: Boolean,
                    value: !0
                }
            },
            relations: {
                "../form/form": {
                    type: "ancestor"
                },
                "../cells/cells": {
                    type: "ancestor"
                }
            },
            data: {
                inForm: !1
            },
            methods: {
                setError: function(e) {
                    this.setData({
                        error: e || !1
                    });
                },
                setInForm: function() {
                    this.setData({
                        inForm: !0
                    });
                },
                setOuterClass: function(e) {
                    this.setData({
                        outerClass: e
                    });
                },
                navigateTo: function() {
                    var e = this, t = this.data;
                    t.url && t.link && wx.navigateTo({
                        url: t.url,
                        success: function(t) {
                            e.triggerEvent("navigatesuccess", t, {});
                        },
                        fail: function(t) {
                            e.triggerEvent("navigateerror", t, {});
                        }
                    });
                }
            }
        });
    }
});