var t = require("../../@babel/runtime/helpers/typeof");

module.exports = function(e) {
    var n = {};
    function r(t) {
        if (n[t]) return n[t].exports;
        var a = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(a.exports, a, a.exports, r), a.l = !0, a.exports;
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
        var a = Object.create(null);
        if (r.r(a), Object.defineProperty(a, "default", {
            enumerable: !0,
            value: e
        }), 2 & n && "string" != typeof e) for (var i in e) r.d(a, i, function(t) {
            return e[t];
        }.bind(null, i));
        return a;
    }, r.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return r.d(e, "a", e), e;
    }, r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, r.p = "", r(r.s = 25);
}({
    25: function(t, e, n) {
        Component({
            options: {
                addGlobalClass: !0
            },
            properties: {
                extClass: {
                    type: String,
                    value: ""
                },
                focus: {
                    type: Boolean,
                    value: !1
                },
                placeholder: {
                    type: String,
                    value: "搜索"
                },
                value: {
                    type: String,
                    value: ""
                },
                search: {
                    type: Function,
                    value: null
                },
                throttle: {
                    type: Number,
                    value: 500
                },
                cancelText: {
                    type: String,
                    value: "取消"
                },
                cancel: {
                    type: Boolean,
                    value: !0
                }
            },
            data: {
                result: []
            },
            lastSearch: Date.now(),
            lifetimes: {
                attached: function() {
                    this.data.focus && this.setData({
                        searchState: !0
                    });
                }
            },
            methods: {
                clearInput: function() {
                    this.setData({
                        value: ""
                    }), this.triggerEvent("clear");
                },
                inputFocus: function(t) {
                    this.triggerEvent("focus", t.detail);
                },
                inputBlur: function(t) {
                    this.setData({
                        focus: !1
                    }), this.triggerEvent("blur", t.detail);
                },
                showInput: function() {
                    this.setData({
                        focus: !0,
                        searchState: !0
                    });
                },
                hideInput: function() {
                    this.setData({
                        searchState: !1
                    });
                },
                inputChange: function(t) {
                    var e = this;
                    this.setData({
                        value: t.detail.value
                    }), this.triggerEvent("input", t.detail), Date.now() - this.lastSearch < this.data.throttle || "function" == typeof this.data.search && (this.lastSearch = Date.now(), 
                    this.timerId = setTimeout(function() {
                        e.data.search(t.detail.value).then(function(t) {
                            e.setData({
                                result: t
                            });
                        }).catch(function(t) {
                            console.log("search error", t);
                        });
                    }, this.data.throttle));
                },
                selectResult: function(t) {
                    var e = t.currentTarget.dataset.index, n = this.data.result[e];
                    this.triggerEvent("selectresult", {
                        index: e,
                        item: n
                    });
                }
            }
        });
    }
});