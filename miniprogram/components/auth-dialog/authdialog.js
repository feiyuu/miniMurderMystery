var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../api/request.js")),
    o = getApp();

Component({
    properties: {
        autoShow: {
            type: Boolean,
            value: !1
        },
        force: {
            type: Boolean,
            value: !1
        },
        isPhone: {
            type: Boolean,
            value: !0
        }
    },
    observers: {
        autoShow: function (e) {
            e && (o.globalData.userInfo || (this.wxCode(), this.setData({
                showModal: !0
            })));
        }
    },
    data: {
        showModal: !1,
        showPhone: !1,
        canIUseGetUserProfile: !1
    },
    attached: function () {
        wx.getUserProfile && this.setData({
            canIUseGetUserProfile: !0
        });
    },
    ready: function () {
        this.data.autoShow && (o.globalData.userInfo || (this.wxCode(), this.setData({
            showModal: !0
        })));
    },
    methods: {
        closeAuth: function () {
            this.setData({
                showModal: !1
            });
        },
        closePhone: function () {
            this.setData({
                showPhone: !1
            });
        },
        getUserProfile: function (e) {
            var a = this;
            console.log(e);
            wx.getAccountInfoSync();
            wx.getUserProfile({
                lang: "zh_CN",
                desc: "用于完善会员资料",
                success: function (e) {
                    console.log(e);
                    var t = a;
                    o.globalData.u = {
                        avatarUrl: e.userInfo.avatarUrl,
                        gender: e.userInfo.gender,
                        nickName: e.userInfo.nickName
                    }
                    a.getUser(e)
                    t.setData({
                        // showPhone: !0,
                        showModal: !1
                    });
                }
            });
        },
        getUserInfo: function (e) {
            wx.getAccountInfoSync();
            var _this = this;
            o.globalData.u = {
                avatarUrl: e.detail.userInfo.avatarUrl,
                gender: e.detail.userInfo.gender,
                nickName: e.detail.userInfo.nickName
            }
            _this.getUser(e)
            this.setData({
                // showPhone: !0,
                showModal: !1
            });
        },
        getPhoneNumber: function (a) {
            if (!a.detail.encryptedData) return console.log("用户拒绝获取手机号"), void console.log(a.detail.errMsg);
            var t = wx.getAccountInfoSync(),
                n = this;
            e.default.savePhone({
                method: "POST",
                data: {
                    code: n.code,
                    encryptedData: a.detail.encryptedData,
                    iv: a.detail.iv,
                    appid: t.miniProgram.appId,
                    avatarUrl: o.globalData.u.avatarUrl,
                    gender: o.globalData.u.gender,
                    nickName: o.globalData.u.nickName
                },
                success: function (e) {
                    n.closePhone(), n.wxCode(), n.getUser(e);
                },
                fail: function (e) {
                    n.wxCode();
                }
            });
        },
        wxCode: function () {
            var e = this;
            wx.login({
                success: function (o) {
                    console.log("login", o), e.code = o.code;
                }
            });
        },
        getUser: function (a) {
            var t = this,
                n = wx.getAccountInfoSync();
            e.default.requestAction({
                method: "POST",
                data: {
                    action: "dpgxyh",
                    dpid: o.globalData.dpid,
                    weixinid: a,
                    appid: n.miniProgram.appId
                },
                success: function (e) {
                    console.log(e), o.globalData.userInfo = e, console.log, t.triggerEvent("authEvent", {});
                },
                fail: function () {
                    t.wxCode();
                }
            });
        }
    }
});