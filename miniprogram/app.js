// app.js
App({
  globalData: {
    dlAPP: !1,
    idata: null,
    dpdata: {},
    pletemp: null,
    DianPuShouJi: "",
    dpid: "",
    dpName: "",
    zuobiao: "",
    userInfo: null,
    city: "北京",
    tempstr: "",
    statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
    barHeight: wx.getMenuButtonBoundingClientRect().height + 2 * (wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().statusBarHeight)
  },
  onLaunch: function () {

  }
});