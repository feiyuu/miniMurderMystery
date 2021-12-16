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

        detailData: {
            dramaId: 1001,
            dramaCover: "https://img0.baidu.com/it/u=2380516898,174121639&fm=253&fmt=auto&app=120&f=JPEG?w=186&h=215",
            isNew: 1,
            dramaName: "三千鸦杀",
            background: '欢乐',
            theme: '情感',
            background: '民国',
            numbers: 6,
            isCollect: false,
            dramaGrade: 5,
            profile: '剧本简介：这是一个欢乐情感的本，适合新手，一定要拉上你喜欢的人一起，会很有趣,七个密室，没有一个是敷衍写写的，破第一二个的时候其实还好，不是很难时间压得特别紧凑，山厕所都不敢去因为太有趣了实在不敢去实在不想走开！到第四个密室开始就开始很难了，到第七个密室的时候倒吸一口气结合前面每个密室一部分的手法做出来的终极大Boss ！真的妙啊！最后还原了70%左右（大概是最后一个密室核诡盘出，背景故事全复原，破了4个密室手法和找对凶手）花了整整7个小时掉了一大把头发。',
            NanNvShu: '3男3女',
            duration: '3',
            difficulty: '硬核',
            genre: '本格',
            beforehand: '1',
            price: 100,
            organizeTeamId: 1001,
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
            }, ],

            startTime: '2021-11-24 22:00', //比对时长和开始时间，决定组局状态
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
        },
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
    back: function () {
        wx.navigateBack({});
    },
    pay: function () {
        var that = this;
        if (!that.paying) {
            that.paying = !0
            let loginRequest = new ApiRequest();
            loginRequest.apiName = "/storeMsMini/payCharge";
            loginRequest.method = 'POST';
            loginRequest.addParam("isBlance", 0 == that.data.position);
            loginRequest.addParam("thumUrl", that.data.detailData.dramaCover);
            loginRequest.addParam("charge", that.data.detailData.price);
            loginRequest.addParam("recordName", "支付《" + that.data.detailData.dramaName + "》组局费用：-" + that.data.detailData.price);
            loginRequest.apiCallback = function (success, response) {
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
                enquene(loginRequest);
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
            title: app.globalData.userInfo.nickName + "邀请你上车剧本《" + this.data.detailData.dramaName + "》",
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