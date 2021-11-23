var t = require("../../@babel/runtime/helpers/interopRequireDefault"),
    a = require("../../@babel/runtime/helpers/objectSpread2"),
    e = t(require("../../api/request.js")),
    i = t(require("../../utils/util")),
    o = getApp(),
    s = "";

Page({
    data: {
        showModal: !1,
        FuDongJia: 0,
        theme: "",
        statusBarHeight: o.globalData.statusBarHeight,
        tubiao: "z_moren",
        playing: "",
        detailData: {},
        zjData: {},
        joined: !1,
        payJiaGe: "-",
        isCanPay: !0,
        YuE: "",
        position: 0,
        showPay: !1,
        TuiGuang: 0,
        cheweiNan: 0,
        cheweiNv: 0,
        cheWeiBeiZhu: ""
    },
    joinPay: function () {
        o.globalData.userInfo && o.globalData.userInfo.WeiXinId ? (this.gYue(), this.setData({
            showPay: !0
        })) : this.setData({
            showModal: !0
        });
    },
    back: function () {
        wx.navigateBack({});
    },
    pay: function () {
        var t = this;
        if (!this.paying)
            if (this.paying = !0, 0 == this.data.position) {
                var i = {};
                if (u = wx.getStorageSync("tg")) {
                    var n = 864e5;
                    (d = wx.getStorageSync("ts")) && Date.parse(new Date()) - d < n && (i = {
                        tg: u,
                        ts: d
                    });
                }
                e.default.pay({
                    method: "POST",
                    data: a(a({}, i), {}, {
                        action: "dpyhye",
                        WeiXinId: o.globalData.userInfo.WeiXinId,
                        ZuJuId: s,
                        jbId: this.data.zjData.JuBenId,
                        XingBie: 1 == o.globalData.userInfo.gender ? "男" : "女",
                        dpId: o.globalData.dpid
                    }),
                    success: function (a) {
                        this.paying = !1, wx.showToast({
                            title: "加入完成",
                            icon: "success",
                            success: function () {
                                setTimeout(function () {
                                    t.getdpzjdetailData();
                                }, 1500);
                            }
                        }), t.setData({
                            showPay: !1
                        });
                    },
                    fail: function (t) {
                        this.paying = !1, wx.showToast({
                            title: t.msg ? t.msg : t,
                            icon: "none"
                        }), console.log(t);
                    }
                });
            } else {
                var u, l = wx.getAccountInfoSync();
                i = {};
                if (u = wx.getStorageSync("tg")) {
                    var d;
                    n = 864e5;
                    (d = wx.getStorageSync("ts")) && Date.parse(new Date()) - d < n && (i = {
                        tg: u,
                        ts: d
                    });
                }
                e.default.pay({
                    method: "POST",
                    data: a(a({}, i), {}, {
                        action: "dianpu",
                        WeiXinId: o.globalData.userInfo.WeiXinId,
                        ZuJuId: s,
                        jbId: this.data.zjData.JuBenId,
                        XingBie: 1 == o.globalData.userInfo.gender ? "男" : "女",
                        dpId: o.globalData.dpid,
                        appid: l.miniProgram.appId
                    }),
                    success: function (a) {
                        if (console.log(a), t.paying = !1, null != a.WxPay && null == a.nonceStr) return wx.showToast({
                            title: "加入完成",
                            icon: "success",
                            success: function () {
                                setTimeout(function () {
                                    t.getdpzjdetailData();
                                }, 1500);
                            }
                        }), void t.setData({
                            showPay: !1
                        });
                        wx.requestPayment({
                            timeStamp: a.timeStamp,
                            nonceStr: a.nonceStr,
                            package: a.package,
                            signType: a.signType,
                            paySign: a.paySign,
                            success: function (a) {
                                t.paying = !1, console.log(a), "requestPayment:ok" == a.errMsg && (wx.showToast({
                                    title: "支付成功",
                                    icon: "success",
                                    success: function () {
                                        setTimeout(function () {
                                            t.getdpzjdetailData();
                                        }, 1500);
                                    }
                                }), t.setData({
                                    showPay: !1
                                }));
                            },
                            fail: function (a) {
                                t.paying = !1, a && "requestPayment:fail cancel" != a.errMsg && wx.showToast({
                                    title: a.errMsg ? a.errMsg : "发生错误",
                                    icon: "none"
                                });
                            }
                        });
                    },
                    fail: function (a) {
                        t.paying = !1, wx.showToast({
                            title: a.msg,
                            icon: "none",
                            duration: 1500
                        });
                    }
                });
            }
    },
    bindjinputEventNan: function (t) {
        console.log(t.detail.value), this.setData({
            cheweiNan: t.detail.value
        });
    },
    bindjinputEventNv: function (t) {
        this.setData({
            cheweiNv: t.detail.value
        });
    },
    bindInput: function (t) {
        this.setData({
            cheWeiBeiZhu: t.detail.value
        });
    },
    yuLiuCheWei: function () {
        var t = this;
        e.default.requestAction({
            method: "POST",
            data: {
                action: "addzjr",
                dpId: o.globalData.dpid,
                zjId: s,
                BeiZhu: this.data.cheWeiBeiZhu,
                NanRenShu: this.data.cheweiNan,
                NvRenShu: this.data.cheweiNv,
                WeiXinId: o.globalData.userInfo.WeiXinId
            },
            success: function (a) {
                console.log(a), t.setData({
                    showCheWei: !1
                });
                var e = t.option;
                t.setData({
                    detailData: e
                }, function () {
                    t.getdpzjdetailData();
                });
            },
            fail: function (t) {
                wx.showToast({
                    title: t && t.msg,
                    icon: "none"
                });
            }
        });
    },
    showCheWei: function () {
        this.setData({
            showCheWei: !0
        });
    },
    gYue: function () {
        var t = this;
        e.default.requestAction({
            method: "GET",
            data: {
                action: "dpyhye",
                dpId: o.globalData.dpid,
                WeiXinId: o.globalData.userInfo.WeiXinId
            },
            success: function (a) {
                console.log(a), t.setData({
                    YuE: a.YuE
                }), t.data.zjData.JiaGe > a.YuE && t.setData({
                    isCanPay: !1,
                    position: 1
                });
            }
        });
    },
    bindauthEvent: function () {
        var t = this,
            a = this.option;
        console.log(a), this.setData({
            TuiGuang: o.globalData.userInfo.TuiGuang
        }), this.setData({
            detailData: a
        }, function () {
            t.getdpzjdetailData();
        });
    },
    onLoad: function (t) {
        var a = this;
        this.option = t, console.log(this.option), s = t.ZuJuId, this.setData({
            theme: o.globalData.dpdata.PeiSe,
            tubiao: o.globalData.dpdata.TuBiao,
            FuDongJia: o.globalData.dpdata.FuDongJia,
            TuiGuang: o.globalData.userInfo ? o.globalData.userInfo.TuiGuang : 0
        }), this.setData({
            detailData: t
        }, function () {
            o.globalData.userInfo && o.globalData.userInfo.WeiXinId ? a.getdpzjdetailData() : a.setData({
                showModal: !0
            });
        });
    },
    goZuju: function () {
        console.log("哈哈哈哈"), wx.redirectTo({
            url: "/pages/myzuju/myzuju"
        });
    },
    jbdetail: function (t) {
        var a = this;
        e.default.requestAction({
            method: "GET",
            data: {
                action: "jbdetail",
                jbId: t
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
        var a = this.data.zjData.JuBenName ? this.data.zjData.JuBenName : this.data.zjData.JuBenTiCai,
            e = "";
        return o.globalData && o.globalData.userInfo && 1 == o.globalData.userInfo.TuiGuang && (e = "&tg=".concat(o.globalData.userInfo.WeiXinId, "&ts=").concat(Date.parse(new Date()))),
            console.log("/pages/index/welcome?path=/pages/zuju01/zuju&dpid=".concat(o.globalData.dpid, "&ZuJuId=").concat(s) + e), {
                title: "邀请你组局" + a,
                path: "/pages/index/welcome?path=/pages/zuju01/zuju&dpid=".concat(o.globalData.dpid, "&ZuJuId=").concat(s) + e
            };
    },
    getdpzjdetailData: function () {
        var t = this;
        e.default.requestAction({
            method: "GET",
            data: {
                action: "dpzjdetails",
                ZuJuId: s,
                WeiXinId: o.globalData.userInfo.WeiXinId
            },
            success: function (a) {
                if (t.setData({
                        zjData: a
                    }), a.users)
                    for (var e = 0; e < a.users.length; e++) {
                        if (1 == a.users[e].ZhuangTai) {
                            t.setData({
                                joined: !0,
                                showPay: !1
                            });
                            break;
                        }
                    }
            },
            fail: function (t) {
                wx.showToast({
                    title: t.msg ? t.msg : t,
                    icon: "none"
                }), console.log(t);
            }
        });
    },
    playAudio: function (t) {
        var a = this;
        if (console.log(t), "正在播放" == this.data.playing && this.innerAudioContext) return this.innerAudioContext && this.innerAudioContext.pause(),
            void this.setData({
                playing: ""
            });
        if (this.innerAudioContext) return console.log("播放"), this.innerAudioContext.play(),
            void this.setData({
                playing: "正在播放"
            });
        var e = t.currentTarget.dataset.shengyin;
        console.log(e), this.innerAudioContext = wx.createInnerAudioContext(), this.innerAudioContext.obeyMuteSwitch = !1,
            this.innerAudioContext.autoplay = !0, this.innerAudioContext.src = i.default.transformImageUrl(e),
            this.innerAudioContext.onPlay(function () {
                console.log("xxxx"), a.setData({
                    playing: "正在播放"
                });
            }), this.innerAudioContext.onEnded(function () {
                a.setData({
                    playing: ""
                });
            });
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
    goZhuChi: function (t) {
        var a = t.currentTarget.dataset.zcid;
        a > 0 && wx.navigateTo({
            url: "/pages/zhuchi/zhuchi?zcid=" + a
        });
    },
    goJuben: function (t) {
        var a = t.currentTarget.dataset.jbid;
        console.log(a), a && a > 0 && wx.navigateTo({
            url: "/pages/juben/juben?jbId=".concat(a)
        });
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