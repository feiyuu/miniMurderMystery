var request = require("../../api/request.js"),
  app = getApp();
import {
  ApiRequest,
  enquene
} from '../../doframework/network/ApiManager';

Page({
  data: {
    dlApp: !1,
    theme: "",
    tubiao: "z_moren",
    showModal: false,
    YouHuiQuanNum: "-",
    userInfo: {},
    statusBarHeight: app.globalData.statusBarHeight,
    barHeight: app.globalData.barHeight,
    dpName: app.globalData.dpName,
    dpNameQC: app.globalData.dpNameQC,
    dpid: 0,
    userData: {}
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
      isAuthed: !!app.globalData.userInfo,
      dpid: app.globalData.dpid,
      dlApp: app.globalData.dlAPP
    });
  },
  getMineData: function () {
    var that = this;
    if (!app.globalData.userInfo || !app.globalData.userInfo.openid) {
      that.setData({
        showModal: !0
      });
      return;
    }
    let loginRequest = new ApiRequest();
    loginRequest.apiName = "/storeMsMini/getMineData";
    loginRequest.method = 'GET';
    loginRequest.addParam("openid", app.globalData.userInfo.openid);
    loginRequest.apiCallback = function (success, response) {
      wx.hideLoading({
        success: (res) => {},
      });
      if (success && response.code == 1) {
        console.log(response), that.setData({
          userData: response.data[0]
        });;
      } else {
        
      }
    }
    enquene(loginRequest);
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  bindauthEvent: function () {
    this.getMineData(), this.setData({
      isAuthed: !0
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
    console.log("onShow--------------------------");
    app.globalData.userInfo ? this.getMineData() : this.setData({
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
});