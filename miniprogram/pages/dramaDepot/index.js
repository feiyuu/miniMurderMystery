var interopRequireDefault = require("../../@babel/runtime/helpers/interopRequireDefault"),
    request = interopRequireDefault(require("../../api/request.js")),
    app = getApp(),
    commStyle = require("../../utils/commStyle.js");

Page({
    data: {
        tubiao: "z_moren",
        keyWords: "",
        page: 1,
        loadMoreing: !1,
        showModal: !0,
        statusBarHeight: app.globalData.statusBarHeight,
        halfShow: !1,
        list: [],
        count: 0,
        filterDatas: {
            RenShu: ["2人", "3人", "4人", "5人", "6人", "7人", "8人", "9人", "10人+"],
            ShiChang: ["3-4小时", "4-5小时", "5-6小时", "6+小时"],
            BeiJing: ["古风", "民国", "现代", "未来", "架空", "日式", "欧式", "其他"],
            TiCai: ["惊悚", "情感", "推理", "欢乐", "阵营", "机制", "谍战", "武侠", "玄幻", "立意", "其他"],
            Type: ["新本格", "本格", "变革", "还原", "封闭", "半封闭", "开放"],
            Hardness: ["简单", "进阶", "硬核"],
            Reorder: ["推荐", "热门", "最新", "评分"],

            numbers: {
                city: "",
                param: "",
                cur: "",
                conditions: [{
                    name: "2人",
                    value: 0
                }, {
                    name: "3人",
                    value: 1
                }, {
                    name: "4人",
                    value: 2
                }, {
                    name: "5人",
                    value: 3
                }, {
                    name: "6人",
                    value: 4
                }, {
                    name: "7人",
                    value: 5
                }, {
                    name: "8人",
                    value: 6
                }]
            },
            topic: {
                param: "",
                cur: "",
                conditions: ["3-4小时", "4-5小时", "5-6小时", "6+小时"]
            },
            type: {
                param: "",
                cur: "",
                conditions: ["新本格", "本格", "变革", "还原", "封闭", "半封闭", "开放"]
            },
            difficulty: {
                param: "",
                cur: "",
                conditions: ["简单", "进阶", "硬核"]
            },
            order: {
                param: "推荐",
                cur: 1,
                conditions: ["推荐", "热门", "最新", "评分"]
            }
        }
    },
    onLoad: function (data) {
        var t = this;
        this.getList();
    },
    watch: {
        halfShow: function (data) {
            console.log("halfShow trigger :", data), "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
                show: !data
            });
        }
    },
    halfDialogClose: function () {
        this.setData({
            halfShow: !1
        });
    },
    filterCheck: function (data) {
        var thise, _this = this,
            v = data.target && data.target.dataset && data.target.dataset.value || "",
            s = data.target && data.target.dataset && data.target.dataset.target || "",
            n = data.target && data.target.dataset && data.target.dataset.name || "",
            l = "filterDatas." + s + ".cur",
            r = "filterDatas." + s + ".param";
        console.log(l), this.setData((_this.defineProperty(thise = {
            page: 1
        }, r, n), _this.defineProperty(thise, l, v), _this.defineProperty(thise, "loadMoreing", !1), thise), function () {
            return _this.getList();
        }), console.log(this.data);
    },
    defineProperty:function(e, r, n) {
        return r in e ? Object.defineProperty(e, r, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[r] = n, e;
    },
    scroll: function (data) {
        console.log("scroll trigger request is :", data);
    },
    onShow: function () {},
    onPullDownRefresh: function () {
        this.setData({
            "filterDatas.numbers.cur": "",
            "filterDatas.topic.cur": "",
            "filterDatas.type.cur": "",
            "filterDatas.type.param": "",
            "filterDatas.difficulty.cur": "",
            "filterDatas.order.cur": 1,
            "filterDatas.order.param": "推荐",
            "filterDatas.numbers.param": "",
            "filterDatas.topic.param": "",
            "filterDatas.difficulty.param": "",
            page: 1
        }), wx.showNavigationBarLoading(), this.getList();
    },
    onReachBottom: function () {
        this.getList(), console.log("xxxxxxxxxxx");
    },
    popHalf: function (data) {
        this.setData({
            halfShow: !0
        });
    },
    jubenDetail: function (data) {
        console.log(data), wx.navigateTo({
            url: "/pages/juben/juben?jbId=" + data.currentTarget.dataset.jbid
        });
    },

    getList: function () {
        var _this = this;
        this.data.loadMoreing || (_this.data.loadMoreing = !0, request.default.requestAction({
            method: "GET",
            data: {
                action: "dpjbdata",
                dpId: app.globalData.dpid,
                page: _this.data.page,
                MingCheng: _this.data.keyWords,
                TiCai: _this.data.filterDatas.topic.param,
                LeiXing: _this.data.filterDatas.type.param,
                BeiJing: "",
                PaiXv: _this.data.filterDatas.order.param,
                NanDu: _this.data.filterDatas.difficulty.param,
                RenShu: _this.data.filterDatas.numbers.param,
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

    hideModal: function () {
        this.setData({
            showModal: !1
        });
    },
    bindKeyInput: function (input) {
        this.key = input.detail.value;
    },
    search: function () {
        this.data.page = 1, this.data.keyWords = this.key ? this.key : "", this.getList();
    },
});