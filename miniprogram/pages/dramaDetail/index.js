var a = require("../../@babel/runtime/helpers/objectSpread2"),
    e = require("../../api/request.js"),
    utils = require("../../utils/util"),
    o = getApp(),
    s = "";

Page({
    data: {
        showModal: !1,
        FuDongJia: 0,
        statusBarHeight: o.globalData.statusBarHeight,
        tubiao: "z_moren",
        playing: "",
        detailData: {
            dramaId: 1001,
            dramaCover: "https://img0.baidu.com/it/u=2380516898,174121639&fm=253&fmt=auto&app=120&f=JPEG?w=186&h=215",
            isNew: 1,
            dramaName: "三千鸦杀",
            background: '欢乐',
            theme: '情感',
            background: '民国',
            numbers: 6,
            dramaGrade: 5,
            profile: '剧本简介：这是一个欢乐情感的本，适合新手，一定要拉上你喜欢的人一起，会很有趣,七个密室，没有一个是敷衍写写的，破第一二个的时候其实还好，不是很难时间压得特别紧凑，山厕所都不敢去因为太有趣了实在不敢去实在不想走开！到第四个密室开始就开始很难了，到第七个密室的时候倒吸一口气结合前面每个密室一部分的手法做出来的终极大Boss ！真的妙啊！最后还原了70%左右（大概是最后一个密室核诡盘出，背景故事全复原，破了4个密室手法和找对凶手）花了整整7个小时掉了一大把头发。',
            NanNvShu: '3男3女',
            duration: '3',
            difficulty: '硬核',
            type: '本格',
            beforehand: '1',
            price: 100,
            organizeTeamId:1001,


            startTime: '2021-11-24 22:00',//比对时长和开始时间，决定组局状态
            DMId: 1101,
            DMName: '小酒',
            roomId: 1003,
            roomName: '',
            teamUsersId: 1005,
            teamDramaId: 1005,

            teamUsers: [{
                    teamUserAvatar: "https://img1.baidu.com/it/u=1386169436,3305309126&fm=253&fmt=auto&app=120&f=JPEG?w=200&h=200",
                    teamUserSex: '男',
                    teamUserName: '吴亦凡',
                    teamUserId: 'asddsadxasd1234asdasd',
                    teamUserJoinTime: '2021-11-24 10:22'
                },
                {
                    teamUserAvatar: "https://img1.baidu.com/it/u=1386169436,3305309126&fm=253&fmt=auto&app=120&f=JPEG?w=200&h=200",
                    teamUserSex: '男',
                    teamUserName: '吴亦凡',
                    teamUserId: 'asddsadxasd1234asdasd',
                    teamUserJoinTime: '2021-11-24 10:22'
                },
                {
                    teamUserAvatar: "https://img1.baidu.com/it/u=1386169436,3305309126&fm=253&fmt=auto&app=120&f=JPEG?w=200&h=200",
                    teamUserSex: '男',
                    teamUserName: '吴亦凡',
                    teamUserId: 'asddsadxasd1234asdasd',
                    teamUserJoinTime: '2021-11-24 10:22'
                },
                {
                    teamUserAvatar: "https://img1.baidu.com/it/u=1386169436,3305309126&fm=253&fmt=auto&app=120&f=JPEG?w=200&h=200",
                    teamUserSex: '男',
                    teamUserName: '吴亦凡',
                    teamUserId: 'asddsadxasd1234asdasd',
                    teamUserJoinTime: '2021-11-24 10:22'
                },
            ],
            roles: [{
                roleAvatar: 'https://img1.baidu.com/it/u=4025025658,2931130138&fm=26&fmt=auto',
                roleName: '染谷将太',
                roleSex: '男'
            }, {
                roleAvatar: 'https://img2.baidu.com/it/u=4127921897,761507293&fm=26&fmt=auto',
                roleName: '染谷将太',
                roleSex: '男'
            }, {
                roleAvatar: 'https://img0.baidu.com/it/u=3739576280,1915435388&fm=253&fmt=auto&app=120&f=PNG?w=200&h=200',
                roleName: '染谷将太',
                roleSex: '男'
            }, {
                roleAvatar: 'https://img0.baidu.com/it/u=3211627156,1665674786&fm=26&fmt=auto',
                roleName: '染谷将太',
                roleSex: '男'
            }, {
                roleAvatar: 'https://img1.baidu.com/it/u=2386722414,2264491889&fm=26&fmt=auto',
                roleName: '染谷将太',
                roleSex: '男'
            }, {
                roleAvatar: 'https://img2.baidu.com/it/u=2146252702,1388388301&fm=26&fmt=auto',
                roleName: '染谷将太',
                roleSex: '男'
            }, ]
        },
        zjData: {},
        joined: !1,
        hasMe: 1,
        payJiaGe: "-",
        isCanPay: !0,
        YuE: "",
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
            n.push(utils.imageMogr(u.avatar, "0/w/500"));
        }
        wx.previewImage({
            current: n[t],
            urls: n
        });
    },
    joinPay: function () {
        o.globalData.userInfo && o.globalData.userInfo.wxCode ? (this.gYue(), this.setData({
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
                e.pay({
                    method: "POST",
                    data: a(a({}, i), {}, {
                        action: "dpyhye",
                        wxCode: o.globalData.userInfo.wxCode,
                        ZuJuId: s,
                        dramaId: this.data.zjData.JuBenId,
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
                e.pay({
                    method: "POST",
                    data: a(a({}, i), {}, {
                        action: "dianpu",
                        wxCode: o.globalData.userInfo.wxCode,
                        ZuJuId: s,
                        dramaId: this.data.zjData.JuBenId,
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
    gYue: function () {
        var t = this;
        e.requestAction({
            method: "GET",
            data: {
                action: "dpyhye",
                dpId: o.globalData.dpid,
                wxCode: o.globalData.userInfo.wxCode
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
            detailData: a
        }, function () {
            t.getdpzjdetailData();
        });
    },
    onLoad: function (t) {
        var a = this;
        this.option = t, console.log(this.option), s = t.ZuJuId,
            o.globalData.userInfo && o.globalData.userInfo.wxCode ? a.getdpzjdetailData() : a.setData({
                // showModal: !0
            });

    },

    jbdetail: function (t) {
        var a = this;
        e.requestAction({
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
        var a = this.data.zjData.JuBenName ? this.data.zjData.JuBenName : this.data.zjData.JuBenTiCai,
            e = "";
        return o.globalData && o.globalData.userInfo && (e = "&tg=".concat(o.globalData.userInfo.wxCode, "&ts=").concat(Date.parse(new Date()))),
            console.log("/pages/index/welcome?path=/pages/zuju01/zuju&dpid=".concat(o.globalData.dpid, "&ZuJuId=").concat(s) + e), {
                title: "邀请你组局" + a,
                path: "/pages/index/welcome?path=/pages/zuju01/zuju&dpid=".concat(o.globalData.dpid, "&ZuJuId=").concat(s) + e
            };
    },
    getdpzjdetailData: function () {
        var t = this;
        e.requestAction({
            method: "GET",
            data: {
                action: "dpzjdetails",
                ZuJuId: s,
                wxCode: o.globalData.userInfo.wxCode
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