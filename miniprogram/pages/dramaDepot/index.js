var  defineProperty = require("../../@babel/runtime/helpers/defineProperty"),
    request = require("../../api/request.js"),
    app = getApp();

Page({
    data: {
        FuDongJia: 10,
        tubiao: "z_moren",
        keyWords: "",
        page: 1,
        loadMoreing: !1,
        statusBarHeight: app.globalData.statusBarHeight,
        list: [{
                jbId: 1001,
                FengMian: "https://img0.baidu.com/it/u=2380516898,174121639&fm=253&fmt=auto&app=120&f=JPEG?w=186&h=215",
                Xin: 1,
                MingCheng: "三千鸦杀",
                BiaoQian: '欢乐',
                theme: '情感',
                background: '民国',
                JianJie: '剧本简介：这是一个欢乐情感的本，适合新手，一定要拉上你喜欢的人一起，会很有趣',
                NanNvShu: '3男3女',
                duration: '3',
                difficulty: '硬核',
                YuGao: '1',
                DanJia: "100"

            }, {
                jbId: 1001,
                FengMian: "http://t15.baidu.com/it/u=3901498348,2232291937&fm=224&app=112&f=JPEG?w=162&h=230",
                Xin: 1,
                MingCheng: "三千鸦杀",
                BiaoQian: '欢乐',
                theme: '情感',
                background: '民国',
                JianJie: '剧本简介：这是一个欢乐情感的本，适合新手，一定要拉上你喜欢的人一起，会很有趣',
                NanNvShu: '3男3女',
                duration: '3',
                difficulty: '硬核',
                YuGao: '0',
                DanJia: "80"

            }, {
                jbId: 1001,
                FengMian: "https://img2.baidu.com/it/u=2411936941,1136968929&fm=253&fmt=auto&app=120&f=PNG?w=128&h=181",
                Xin: 1,
                MingCheng: "三千鸦杀",
                BiaoQian: '欢乐',
                theme: '情感',
                background: '民国',
                JianJie: '剧本简介：这是一个欢乐情感的本，适合新手，一定要拉上你喜欢的人一起，会很有趣',
                NanNvShu: '3男3女',
                duration: '3',
                difficulty: '硬核',
                YuGao: '0',
                DanJia: "200"

            }, {
                jbId: 1001,
                FengMian: "https://img0.baidu.com/it/u=3198484303,3700892012&fm=253&fmt=auto&app=120&f=JPEG?w=140&h=249",
                Xin: 1,
                MingCheng: "三千鸦杀",
                BiaoQian: '欢乐',
                theme: '情感',
                background: '民国',
                JianJie: '剧本简介：这是一个欢乐情感的本，适合新手，一定要拉上你喜欢的人一起，会很有趣',
                NanNvShu: '3男3女',
                duration: '3',
                difficulty: '硬核',
                YuGao: '0',
                DanJia: "150"

            },

        ],
        count: 0,
        filterDatas: {
            numbers: {
                city: "",
                param: "",
                cur: "",
                conditions: [{
                    name: "2人",
                    value: 1
                }, {
                    name: "3人",
                    value: 2
                }, {
                    name: "4人",
                    value: 3
                }, {
                    name: "5人",
                    value: 4
                }, {
                    name: "6人",
                    value: 5
                }, {
                    name: "7人",
                    value: 6
                }, {
                    name: "8人",
                    value: 7
                }, {
                    name: "9人",
                    value: 8
                }, {
                    name: "10人+",
                    value: 9
                }]
            },
            duration: {
                param: "",
                cur: "",
                conditions: [{
                    name: "3-4小时",
                    value: 1
                }, {
                    name: "4-5小时",
                    value: 2
                }, {
                    name: "5-6小时",
                    value: 3
                }, {
                    name: "6+小时",
                    value: 4
                }]
            },
            background: {
                param: "",
                cur: "",
                conditions: [{
                    name: "古风",
                    value: 1
                }, {
                    name: "民国",
                    value: 2
                }, {
                    name: "现代",
                    value: 3
                }, {
                    name: "未来",
                    value: 4
                }, {
                    name: "架空",
                    value: 5
                }, {
                    name: "日式",
                    value: 6
                }, {
                    name: "欧式",
                    value: 7
                }, {
                    name: "其他",
                    value: 8
                }]
            },
            theme: {
                param: "",
                cur: "",
                conditions: [{
                    name: "惊悚",
                    value: 1
                }, {
                    name: "情感",
                    value: 2
                }, {
                    name: "推理",
                    value: 3
                }, {
                    name: "欢乐",
                    value: 4
                }, {
                    name: "阵营",
                    value: 5
                }, {
                    name: "机制",
                    value: 6
                }, {
                    name: "谍战",
                    value: 7
                }, {
                    name: "武侠",
                    value: 8
                }, {
                    name: "玄幻",
                    value: 9
                }, {
                    name: "立意",
                    value: 10
                }, {
                    name: "其他",
                    value: 11
                }]
            },
            type: {
                param: "",
                cur: "",
                conditions: [{
                    name: "新本格",
                    value: 1
                }, {
                    name: "本格",
                    value: 2
                }, {
                    name: "变革",
                    value: 3
                }, {
                    name: "还原",
                    value: 4
                }, {
                    name: "封闭",
                    value: 5
                }, {
                    name: "半封闭",
                    value: 6
                }, {
                    name: "开放",
                    value: 7
                }]
            },
            difficulty: {
                param: "",
                cur: "",
                conditions: [{
                    name: "简单",
                    value: 1
                }, {
                    name: "进阶",
                    value: 2
                }, {
                    name: "硬核",
                    value: 3
                }]
            },
            order: {
                param: "推荐",
                cur: 1,
                conditions: [{
                    name: "推荐",
                    value: 1
                }, {
                    name: "热门",
                    value: 2
                }, {
                    name: "最新",
                    value: 3
                }]
            }
        }
    },
    onLoad: function (data) {
        var t = this;
        this.getList();
    },

    filterCheck: function (data) {
        var thise, _this = this,
            v = data.target && data.target.dataset && data.target.dataset.value || "",
            s = data.target && data.target.dataset && data.target.dataset.target || "",
            n = data.target && data.target.dataset && data.target.dataset.name || "",
            l = "filterDatas." + s + ".cur",
            r = "filterDatas." + s + ".param";
        console.log(l), this.setData((defineProperty(thise = {
            page: 1
        }, r, n), defineProperty(thise, l, v), defineProperty(thise, "loadMoreing", !1), thise), function () {
            return _this.getList();
        }), console.log(this.data);
    },
    scroll: function (data) {
        console.log("scroll trigger request is :", data);
    },
    onShow: function () {},
    onPullDownRefresh: function () {
        this.setData({
            "filterDatas.numbers.cur": "",
            "filterDatas.numbers.param": "",
            "filterDatas.duration.cur": "",
            "filterDatas.duration.param": "",
            "filterDatas.background.cur": "",
            "filterDatas.background.param": "",
            "filterDatas.theme.cur": "",
            "filterDatas.theme.param": "",
            "filterDatas.type.cur": "",
            "filterDatas.type.param": "",
            "filterDatas.difficulty.cur": "",
            "filterDatas.difficulty.param": "",
            "filterDatas.order.cur": 1,
            "filterDatas.order.param": "推荐",
            page: 1
        }), wx.showNavigationBarLoading(), this.getList();
    },
    onReachBottom: function () {
        this.getList(), console.log("xxxxxxxxxxx");
    },

    jubenDetail: function (data) {
        console.log(data), wx.navigateTo({
            url: "/pages/dramaDetail/index?jbId=" + data.currentTarget.dataset.jbid
        });
    },
    getList: function () {
        var _this = this;
        this.data.loadMoreing || (_this.data.loadMoreing = !0, request.requestAction({
            method: "GET",
            data: {
                action: "dpjbdata",
                dpId: app.globalData.dpid,
                page: _this.data.page,
                MingCheng: _this.data.keyWords,
                numbers: _this.data.filterDatas.numbers.param,
                duration: _this.data.filterDatas.duration.param,
                background: _this.data.filterDatas.background.param,
                theme: _this.data.filterDatas.theme.param,
                type: _this.data.filterDatas.type.param,
                difficulty: _this.data.filterDatas.difficulty.param,
                order: _this.data.filterDatas.order.param,
                nodivision: !0
            },
            success: function (t) {
                console.log(t), _this.setData({
                    count: t.count
                });
                t = t.data;
                if (_this.data.page > 1) {
                    var liste = _this.data.list.concat(t);
                    _this.setData({
                        list: liste,
                        loadMoreing: t.length < 10
                    });
                } else _this.setData({
                    list: t,
                    loadMoreing: !1
                });
                _this.data.page = _this.data.page + 1, wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
            },
            fail: function () {
                _this.data.loadMoreing = !1, wx.stopPullDownRefresh();
            }
        }));
    },

    bindKeyInput: function (input) {
        this.key = input.detail.value;
    },
    search: function () {
        this.data.page = 1, this.data.keyWords = this.key ? this.key : "", this.getList();
    },
});