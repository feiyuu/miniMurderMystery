var a = "https://www.juapp.cn/jb/data.aspx", t = new Set(), e = function(a, e) {
    console.log(t);
    var d = "";
    for (var n in a.data) d += n + "&" + a.data[n];
    console.log(d), t.has(e + "-" + d) || (a.data && a.data.noloading ? delete a.data.noloading : wx.showLoading({
        title: "加载中..."
    }), t.add(e + "-" + d), wx.request({
        url: e,
        method: a.method || "GET",
        data: a.data || {},
        header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        success: function(t) {
            a.data && a.data.noloading || wx.hideLoading(), t.data && 0 == t.data.code ? (console.log(a), 
            a.data && 1 == a.data.nodivision ? a.success && a.success((t.data && JSON.stringify(t.data).length > 1 && JSON.stringify(t.data), 
            t.data)) : a.success && a.success(t.data.data && JSON.stringify(t.data.data).length > 1 && "{}" != JSON.stringify(t.data.data) ? t.data.data : t.data)) : a.fail && a.fail(t && t.data ? t.data : t);
        },
        fail: function(t) {
            wx.hideLoading(), a.fail && a.fail(t && t.data ? t.data : t);
        },
        complete: function(n) {
            t.delete(e + "-" + d), a.complete && a.complete(n);
        }
    }));
};

module.exports = {
    init: function(t) {
        e(t, a);
    },
    requestAction: function(t) {
        e(t, a);
    },
    requestLbs: function(a) {
        e(a, "https://apis.map.qq.com/ws/geocoder/v1/");
    },
    login: function(a) {
        a.data.encryptedData && (a.data.encryptedData = encodeURIComponent(a.data.encryptedData), 
        a.data.iv = encodeURIComponent(a.data.iv), a.data.encode = 1), e(a, "https://www.juapp.cn/jb/login.aspx");
    },
    pay: function(a) {
        e(a, "https://www.juapp.cn/jb/PayJbsXcx.aspx");
    },
    savePhone: function(a) {
        console.log(a), a.data.encryptedData && (a.data.encryptedData = encodeURIComponent(a.data.encryptedData), 
        a.data.iv = encodeURIComponent(a.data.iv), a.data.encode = 1), e(a, "https://www.juapp.cn/jb/reg.aspx");
    },
    api: function(a) {
        a.data && a.data.noloading ? delete a.data.noloading : wx.showLoading({
            title: "加载中..."
        }), wx.request({
            url: "https://www.juapp.cn/san/api.aspx",
            method: a.method || "GET",
            data: a.data || {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            success: function(t) {
                console.log(t.data), a.data && a.data.noloading || wx.hideLoading(), a.success(t.data);
            },
            fail: function(t) {
                wx.hideLoading(), a.fail && a.fail(t && t.data ? t.data : t);
            },
            complete: function(t) {
                a.complete && a.complete(t);
            }
        });
    },
    report: function(t) {
        e({
            method: "POST",
            data: {
                action: "uprz",
                rz: t
            }
        }, a);
    }
};