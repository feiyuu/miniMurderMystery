var t = require("../../api/request.js"), a = getApp();

Component({
    properties: {
        yhid: {
            type: null,
            value: ""
        }
    },
    observers: {
        yhid: function(t) {
            this.getData();
        }
    },
    data: {
        showModal: !1,
        yhq: null,
        show: !1
    },
    created: function() {
        this.data.yhid && this.getData();
    },
    methods: {
        getData: function() {
            if (this.data.yhid) {
                var e = this;
                t.requestAction({
                    method: "GET",
                    data: {
                        action: "hqyhq",
                        dpId: a.globalData.dpid,
                        yhid: e.data.yhid
                    },
                    success: function(t) {
                        e.setData({
                            yhq: t[0],
                            showModal: !0
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: t.msg,
                            icon: "none"
                        });
                    }
                });
            }
        },
        lingqu: function() {
            if (a.globalData.userInfo) {
                console.log(this.data);
                var e = this;
                t.requestAction({
                    method: "POST",
                    data: {
                        action: "lqyhq",
                        dpId: a.globalData.dpid,
                        yhid: this.data.yhid,
                        wxCode: a.globalData.userInfo.wxCode
                    },
                    success: function(t) {
                        wx.showToast({
                            title: "领取成功",
                            icon: "none"
                        }), e.setData({
                            showModal: !1
                        });
                    },
                    fail: function(t) {
                        console.log(t), wx.showToast({
                            title: t.msg,
                            icon: "none"
                        });
                    }
                });
            } else this.setData({
                show: !0
            });
        }
    }
});