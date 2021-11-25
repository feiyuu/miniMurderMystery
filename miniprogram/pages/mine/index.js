
var request = require("../../api/request.js"),
  app = getApp();

Page({
  data: {
    dlApp: !1,
    theme: "",
    tubiao: "z_moren",
    showModal: !app.globalData.userInfo,
    YouHuiQuanNum: "-",
    userInfo: {},
    statusBarHeight: app.globalData.statusBarHeight,
    barHeight: app.globalData.barHeight,
    dpName: app.globalData.dpName,
    dpNameQC: app.globalData.dpNameQC,
    dpid: 0,
    idata: {}
  },
  onShareAppMessage: function (data) {
    var t = "";
    return app.globalData && app.globalData.userInfo && 1 == app.globalData.userInfo.TuiGuang && (t = "&tg=".concat(app.globalData.userInfo.wxCode, "&ts=").concat(Date.parse(new Date()))), {
      title: app.globalData.dpName + " 个人中心",
      path: "/pages/index/welcome?path=/pages/mine/mine&dpid=".concat(app.globalData.dpid) + t
    };
  },
  onLoad: function () {
    this.setData({
      theme: app.globalData.dpdata.PeiSe,
      tubiao: app.globalData.dpdata.TuBiao,
      dpName: app.globalData.dpName,
      dpNameQC: app.globalData.dpNameQC,
      dpid: app.globalData.dpid,
      dlApp: app.globalData.dlAPP
    });
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  bindauthEvent: function() {
    this.mines(), this.setData({
        isAuthed: !0
    }), this.getIData();
},
  getIData: function () {
    var a = this;
    !app.globalData.userInfo && app.globalData.userInfo.wxCode ? wx.request({
      url: "https://www.juapp.cn/jb/data.aspx",
      method: "POST",
      data: {
        action: "dpgxyh",
        dpid: app.globalData.dpid,
        wxCode: app.globalData.userInfo.wxCode
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      success: function (t) {
        console.log(t.data.data), app.globalData.userInfo = t.data.data, a.setData({
          idata: t.data.data
        });
      },
      fail: function (a) {}
    }) : a.setData({
      idata: app.globalData.userInfo
    });
  },

  goConpons: function () {
    app.globalData.userInfo ? wx.navigateTo({
      url: "/pages/my-coupons/coupon"
    }) : this.setData({
      showModal: !0
    });
  },

  onShow: function () {
    this.mines(), this.setData({
      showModal: !app.globalData.userInfo
    });
  },
  gomyzuju: function () {
    app.globalData.userInfo ? wx.navigateTo({
      url: "/pages/myzuju/myzuju"
    }) : this.setData({
      showModal: !0
    });
  },
  goilike: function () {
    app.globalData.userInfo ? wx.navigateTo({
      url: "/pages/ilikejuben/index"
    }) : this.setData({
      showModal: !0
    });
  },
  goiplayed: function () {
    app.globalData.userInfo ? wx.navigateTo({
      url: "/pages/myzuju/myzuju?iplayed=true"
    }) : this.setData({
      showModal: !0
    });
  },
  goPurchaseHistory: function () {
    app.globalData.userInfo ? wx.navigateTo({
      url: "/pages/myzuju/myzuju?iplayed=true"
    }) : this.setData({
      showModal: !0
    });
  },
  goyue: function () {
    wx.navigateTo({
      url: "/pages/yue/yue"
    });
  },
  auth: function () {
    this.setData({
      showModal: !0
    });
  },
  mines: function () {
    var a = this;
    console.log(app.globalData.userInfo), app.globalData.userInfo && request.requestAction({
      method: "GET",
      data: {
        action: "dpwd",
        dpid: app.globalData.dpid,
        wxCode: app.globalData.userInfo.wxCode
      },
      success: function (t) {
        console.log(t), a.setData({
          userInfo: t
        });
      }
    });
  },

});