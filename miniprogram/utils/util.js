var e = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}, t = function(e) {
    return e && null != e && 0 != e.length ? 0 == e.indexOf("http") ? e : "https://www.juapp.cn" + e.replace(/\\/g, "/") : "";
};

module.exports = {
    formatTime: function(t) {
        var n = t.getFullYear(), r = t.getMonth() + 1, i = t.getDate(), u = t.getHours(), g = t.getMinutes(), o = t.getSeconds();
        return [ n, r, i ].map(e).join("/") + " " + [ u, g, o ].map(e).join(":");
    },
    transformImageUrl: t,
    imageMogr: function(e, n) {
        return e ? e.indexOf("null.jpg") > -1 ? t(e) : -1 == e.indexOf("imageView2") ? t(e + "?imageView2/" + n) : t(e + "/" + n) : "";
    }
};