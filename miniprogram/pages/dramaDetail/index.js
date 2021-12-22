var objectSpread2 = require("../../@babel/runtime/helpers/objectSpread2"),
    request = require("../../api/request.js"),
    utils = require("../../utils/util"),
    app = getApp(),
    zujuID = "";

import {
    ApiRequest,
    enquene
} from '../../doframework/network/ApiManager';

Page({
    data: {
        showModal: !1,
        FuDongJia: 0,
        statusBarHeight: app.globalData.statusBarHeight,
        tubiao: "z_moren",
        playing: "",
        DetailId: "",
        isTeam: false,

        detailData: {},
        zjData: {},
        fullPeoples: !1,
        payJiaGe: "-",
        isCanPay: !0,
        balance: "",
        position: 0,
        showPay: !1,
        gushiHide: !0,
    },
    gsToggle: function () {
        this.setData({
            gushiHide: !this.data.gushiHide
        });
    },
    roleIntro: function (a) {
        for (var t = a.currentTarget.dataset.index, n = [], roles = this.data.detailData.roles, o = 0; o < roles.length; o++) {
            var u = roles[o];
            n.push(u.roleAvatar);
        }
        wx.previewImage({
            current: n[t],
            urls: n
        });
    },
    joinPay: function () {
        app.globalData.userInfo && app.globalData.userInfo.token ? this.getBalance() : this.setData({
            showModal: !0
        });
    },
    quitTeam: function () {
        var that = this;

        wx.showModal({
            title: '提示',
            content: '确认要退出本次组局吗？',
            success: function (res) {
                if (res.confirm) {
                    let quitTeamRequest = new ApiRequest();
                    quitTeamRequest.apiName = "/storeMsMini/quitTeam";
                    quitTeamRequest.method = 'POST';
                    quitTeamRequest.addParam("organizeTeamId", that.data.DetailId);
                    quitTeamRequest.addParam("charge", that.data.detailData.price);
                    quitTeamRequest.addParam("recordName", "退出《" + that.data.detailData.dramaName + "》组局费用：+" + that.data.detailData.price);
                    quitTeamRequest.apiCallback = function (success, response) {
                        wx.hideLoading({})
                        if (success && response.code == 1) {
                            that.getDramaDetail();
                        } else {}
                    }
                    enquene(quitTeamRequest);
                } else if (res.cancel) {

                }
            }
        })
    },
    back: function () {
        wx.navigateBack({});
    },
    pay: function () {
        var that = this;
        if (!that.paying) {
            that.paying = !0
            let payRequest = new ApiRequest();
            payRequest.apiName = "/storeMsMini/payCharge";
            payRequest.method = 'POST';
            payRequest.addParam("isBlance", 0 == that.data.position);
            payRequest.addParam("thumUrl", that.data.detailData.dramaCover);
            payRequest.addParam("charge", that.data.detailData.price);
            payRequest.addParam("recordName", "支付《" + that.data.detailData.dramaName + "》组局费用：-" + that.data.detailData.price);
            payRequest.apiCallback = function (success, response) {
                wx.hideLoading({})
                if (success && response.code == 1) {
                    that.paying = !1, wx.showToast({
                        title: "支付成功",
                        icon: "success",
                        success: function () {
                            that.joinTeam();
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
                enquene(payRequest);
            }, 1500);
        }
    },
    joinTeam: function () {
        var that = this;
        let joinTeamRequest = new ApiRequest();
        joinTeamRequest.apiName = "/storeMsMini/joinTeam";
        joinTeamRequest.method = 'POST';
        joinTeamRequest.addParam("organizeTeamId", that.data.DetailId);
        joinTeamRequest.apiCallback = function (success, response) {
            wx.hideLoading({})
            if (success && response.code == 1) {
                that.getDramaDetail();
            } else {}
        }
        enquene(joinTeamRequest);
    },
    collectDrama: function () {
        var that = this;
        let collectDramaRequest = new ApiRequest();
        collectDramaRequest.apiName = that.data.detailData.isCollect ? "/storeMsMini/unCollectDrama" : "/storeMsMini/collectDrama";
        collectDramaRequest.method = 'POST';
        collectDramaRequest.addParam("dramaId", that.data.DetailId);
        collectDramaRequest.apiCallback = function (success, response) {
            wx.hideLoading({})
            if (success && response.code == 1) {
                that.data.detailData.isCollect = !that.data.detailData.isCollect;
                that.setData({
                    detailData: that.data.detailData
                })
            } else {}
        }
        enquene(collectDramaRequest);
    },

    getBalance: function () {
        console.log("getBalance")
        let that = this;
        let balanceRequest = new ApiRequest();
        balanceRequest.apiName = "/storeMsMini/getBalanceUser";
        balanceRequest.method = 'GET';
        balanceRequest.apiCallback = function (success, response) {
            if (success && response.code == 1) {
                that.setData({
                    balance: response.data
                }, () => {
                    that.setData({
                        showPay: !0
                    })
                }), that.data.detailData.price > response.data && that.setData({
                    isCanPay: !1,
                    position: 1
                });
            } else if (success && response.code == 101) {
                tthathis.setData({
                    showModal: !0
                });
            }
        }
        enquene(balanceRequest);
    },
    bindauthEvent: function () {
        this.getDramaDetail();
    },
    onLoad: function (param) {
        var _this = this;
        this.setData({
            isTeam: !!param.teamId,
            DetailId: !!param.teamId ? param.teamId : param.dramaId
        });
        app.globalData.userInfo && app.globalData.userInfo.token ? (_this.getDramaDetail()) : _this.setData({
            showModal: !0
        });
    },
    getDramaDetail: function () {
        console.log("getDramaDetail")
        let that = this;
        let DramaDetailRequest = new ApiRequest();
        DramaDetailRequest.apiName = that.data.isTeam ? "/storeMsMini/getTeamDetail" : "/storeMsMini/getDramaDetail";
        DramaDetailRequest.method = 'GET';
        DramaDetailRequest.addParam("Id", this.data.DetailId);
        DramaDetailRequest.apiCallback = function (success, response) {
            if (success && response.code == 1) {
                if (that.data.isTeam && parseInt(response.data.numbers) <= parseInt(response.data.teamUsers.length)) {
                    that.setData({
                        fullPeoples: true
                    });
                }
                that.setData({
                    detailData: response.data
                });
                console.log("DramaDetailRequest")
            } else if (success && response.code == 101) {
                tthathis.setData({
                    showModal: !0
                });
            }
        }
        enquene(DramaDetailRequest);
    },
    jbdetail: function (t) {
        var a = this;
        request.requestAction({
            method: "GET",
            data: {
                action: "jbdetail",
                dramaId: t
            },
            success: function (t) {
                var e = a.data.detailData,
                    i = Object.assign(t, e);
                console.log(e), console.log(i), a.setData({
                    detailData: i
                });
            },
            fail: function (t) {
                wx.showToast({
                    title: t.msg ? t.msg : t,
                    icon: "none"
                }), console.log(t);
            }
        });
    },
    onShow: function () {},
    onShareAppMessage: function (t) {
        let date = "",
            _this = this;
        return app.globalData && app.globalData.userInfo && (date = "&tg=".concat(Date.parse(new Date()))), {
            title: _this.data.isTeam ? app.globalData.userInfo.nickName + "邀请您组局剧本《" + this.data.detailData.dramaName + "》" : app.globalData.userInfo.nickName + "向您分享剧本《" + this.data.detailData.dramaName + "》",
            path: "pages/dramaDetail/index?teamId=" + _this.data.DetailId + date
        };
    },

    onHide: function () {
        var t = this;
        this.innerAudioContext && this.innerAudioContext.pause(function () {
            return t.setData({
                playing: ""
            });
        });
    },
    onUnload: function () {
        this.innerAudioContext && this.innerAudioContext.destroy();
    },

    select: function (t) {
        this.data.isCanPay ? this.setData({
            position: t.currentTarget.dataset.ep
        }) : wx.showToast({
            title: "余额不足",
            icon: "none"
        });
    }
});