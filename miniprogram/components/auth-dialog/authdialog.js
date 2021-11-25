var request =require("../../api/request.js"),
    app = getApp();
import {DoApiRequest, enquene,enqueneUpload} from '../../doframework/network/DoApiManager';

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
            e && (app.globalData.userInfo || (this.wxLogin(), this.setData({
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
        this.data.autoShow && (app.globalData.userInfo || (this.wxLogin(), this.setData({
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
            var that = this;
            console.log(e);
            wx.getAccountInfoSync();
            wx.getUserProfile({
                lang: "zh_CN",
                desc: "用于完善会员资料",
                success: function (e) {
                    console.log(e);
                    app.globalData.userInfo = {
                        avatarUrl: e.userInfo.avatarUrl,
                        gender: e.userInfo.gender,
                        nickName: e.userInfo.nickName
                    }
                    that.closeAuth(), that.wxLogin();
                    that.setData({
                        // showPhone: !0,
                        showModal: !1
                    });
                }
            });
        },
        getUserInfo: function (e) {
            wx.getAccountInfoSync();
            var _this = this;
            app.globalData.userInfo = {
                avatarUrl: e.detail.userInfo.avatarUrl,
                gender: e.detail.userInfo.gender,
                nickName: e.detail.userInfo.nickName
            }
            _this.closeAuth(), _this.wxLogin();
            this.setData({
                // showPhone: !0,
                showModal: !1
            });
        },
        getPhoneNumber: function (a) {
            if (!a.detail.encryptedData) return console.log("用户拒绝获取手机号"), void console.log(a.detail.errMsg);
            var t = wx.getAccountInfoSync(),
                n = this;
            request.savePhone({
                method: "POST",
                data: {
                    code: n.code,
                    encryptedData: a.detail.encryptedData,
                    iv: a.detail.iv,
                    appid: t.miniProgram.appId,
                    avatarUrl: app.globalData.userInfo.avatarUrl,
                    gender: app.globalData.userInfo.gender,
                    nickName: app.globalData.userInfo.nickName
                },
                success: function (e) {
                    n.closePhone(), n.wxLogin();
                },
                fail: function (e) {
                    // n.wxLogin();
                }
            });
        },
        wxLogin: function () {
            var that = this;
            wx.login({
                success: function (o) {
                    app.globalData.userInfo.wxCode = o.code,
                        console.log("login", o), that.code = o.code, that.registerOrLogin(o.code);
                }
            });
        },
        registerOrLogin: function (res) {
            let loginRequest = new DoApiRequest();
            loginRequest.apiName = "/player/login/wx/v1";
            loginRequest.method = 'GET';
            loginRequest.addParam("wxCode", res.code);
            loginRequest.addParam("avatarUrl", app.globalData.userInfo.avatarUrl);
            loginRequest.addParam("gender", app.globalData.userInfo.gender);
            loginRequest.addParam("nickName", app.globalData.userInfo.nickName);
            loginRequest.apiCallback = function (success, response) {
                wx.hideLoading({
                    success: (res) => {},
                });
                console.log("response  ===  " + response);
                var responseObj = JSON.parse(response);
                console.log(responseObj), console.log, that.triggerEvent("authEvent", {});
            }
            enquene(loginRequest);
        }
    },
});