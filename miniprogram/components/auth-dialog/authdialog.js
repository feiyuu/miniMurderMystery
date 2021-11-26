var request = require("../../api/request.js"),
    app = getApp();
import {
    ApiRequest,
    enquene
} from '../../doframework/network/ApiManager';

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
        autoShow: function (isLogin) {
            console.log("autoShow--------------------------" + isLogin);
            if (isLogin) {
                this.wxLogin();
            }
        }
    },
    data: {
        showModal: !1,
        canIUseGetUserProfile: !1
    },
    attached: function () {
        wx.getUserProfile && this.setData({
            canIUseGetUserProfile: !0
        });
    },
    ready: function () {},
    methods: {
        closeAuth: function () {
            app.globalData.userInfo = null;
            this.setData({
                showModal: !1
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
                    console.log("getUserProfile");
                    console.log(app.globalData.userInfo);
                    app.globalData.userInfo.avatarUrl = e.userInfo.avatarUrl;
                    app.globalData.userInfo.gender = e.userInfo.gender;
                    app.globalData.userInfo.nickName = e.userInfo.nickName;

                    that.completeLogin();
                    that.setData({
                        showModal: !1
                    });
                }
            });
        },
        getUserInfo: function (e) {
            wx.getAccountInfoSync();
            var _this = this;
            console.log(app.globalData.userInfo);
            app.globalData.userInfo.avatarUrl = e.userInfo.avatarUrl;
            app.globalData.userInfo.gender = e.userInfo.gender;
            app.globalData.userInfo.nickName = e.userInfo.nickName;

            console.log("getUserInfo");
            _this.completeLogin();
            this.setData({
                showModal: !1
            });
        },

        wxLogin: function () {
            var that = this;
            wx.login({
                success: function (o) {
                    console.log("login", o), that.login(o.code);
                }
            });
        },
        login: function (code) {
            let that = this;
            let loginRequest = new ApiRequest();
            loginRequest.apiName = "/storeMsMini/checkUserLogin";
            loginRequest.method = 'GET';
            loginRequest.addParam("wxCode", code);
            loginRequest.apiCallback = function (success, response) {
                wx.hideLoading({
                    success: (res) => {},
                });
                if (success && response.code == 1) {
                    app.globalData.userInfo = {};
                    app.globalData.userInfo.openid = response.openid;
                    console.log(app.globalData.userInfo);
                    console.log(response), that.triggerEvent("authEvent", {});
                } else if (success && response.code == 2) {
                    app.globalData.userInfo = {};
                    app.globalData.userInfo.openid = response.openid;
                    console.log(app.globalData.userInfo);
                    that.setData({
                        showModal: !0
                    });
                } else {
                    wx.showToast({
                        title: response.errmsg + "",
                        icon: "none"
                    })
                }
            }
            enquene(loginRequest);
        },
        completeLogin: function () {
            let that = this;
            let loginRequest = new ApiRequest();
            loginRequest.apiName = "/storeMsMini/registerUser";
            loginRequest.method = 'POST';
            loginRequest.addParam("openid", app.globalData.userInfo.openid);
            loginRequest.addParam("avatarUrl", app.globalData.userInfo.avatarUrl);
            loginRequest.addParam("gender", app.globalData.userInfo.gender);
            loginRequest.addParam("nickName", app.globalData.userInfo.nickName);
            loginRequest.apiCallback = function (success, response) {
                if (success && response.code == 1) {
                    that.triggerEvent("authEvent", {});
                } else {
                    app.globalData.userInfo = null;
                }
            }
            enquene(loginRequest);
        }
    },
});