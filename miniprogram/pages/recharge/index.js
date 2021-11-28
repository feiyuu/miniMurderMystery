var interopRequireDefault = require("../../@babel/runtime/helpers/interopRequireDefault"),
    app = getApp();
import {
    ApiRequest,
    enquene
} from '../../doframework/network/ApiManager';



Page({
    data: {
        current: 0,
        czList: [{
                chong: 500,
                song: 88,
            },
            {
                chong: 1000,
                song: 288,
            },
            {
                chong: 1500,
                song: 320,
            },
            {
                chong: 2000,
                song: 420,
            },
            {
                chong: 3000,
                song: 520,
            },
            {
                chong: 5000,
                song: 800,
            },
        ],

    },
    onLoad: function (a) {
     
    },
    pay: function () {
        console.log("pay")
        var that = this;
        if (!that.paying) {
            that.paying = !0
            let rechargeSum = that.data.czList[that.data.current].chong + that.data.czList[that.data.current].song;
            let loginRequest = new ApiRequest();
            loginRequest.apiName = "/storeMsMini/reCharge";
            loginRequest.method = 'POST';
            loginRequest.addParam("recordUserId", app.globalData.userInfo.openid);
            loginRequest.addParam("charge", that.data.czList[that.data.current].chong);
            loginRequest.addParam("recordName", "余额充值：+" + rechargeSum + "元");
            loginRequest.apiCallback = function (success, response) {
                wx.hideLoading({})
                if (success && response.code == 1) {
                    that.paying = !1, wx.showToast({
                        title: "支付成功",
                        icon: "success",
                        success: function () {
                            
                        }
                    }), that.setData({
                        showPay: !1
                    });
                } else {
                    that.paying = !1, wx.showToast({
                        title: "支付失败",
                        icon: "none"
                    });
                }
            }
            wx.showLoading({
                title: "支付中..."
            });
            setTimeout(function () {
                enquene(loginRequest);
            }, 1500);
        }
    },
    tapSelect: function (a) {
        var t = a.currentTarget.dataset.index;
        this.setData({
            current: t
        });
    },
    bindauthEvent: function () {
        this.setData({
            userInfo: app.globalData.userInfo
        });
    },
});