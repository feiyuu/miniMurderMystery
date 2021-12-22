// index.js
// const app = getApp()
var app = getApp(),
  utils = require("../../utils/util");
import {
  ApiRequest,
  enquene
} from '../../doframework/network/ApiManager';

Page({
  data: {
    tubiao: "z_moren",
    movies: [
      'https://img1.baidu.com/it/u=1412665004,3652807320&fm=26&fmt=auto',
      'https://img1.baidu.com/it/u=3529475728,3428445648&fm=26&fmt=auto',
      'https://img1.baidu.com/it/u=3769294252,1742996689&fm=26&fmt=auto',
    ],
    rooms: [],
    dms: [],
    dramas: [],
    zuobiao: '30.267212111052405,120.18522941925167'
  },
  goDramaDepot: function (a) {
    wx.navigateTo({
      url: "/pages/dramaDepot/index"
    })
  },
  onShow: function (a) {
    this.getRooms();
    this.getDms();
    this.getDramas();
  },
  getRooms: function () {
    console.log("getRooms")
    let that = this;
    let roomsRequest = new ApiRequest();
    roomsRequest.apiName = "/storeMsMini/getRooms";
    roomsRequest.method = 'GET';
    roomsRequest.apiCallback = function (success, response) {
      wx.stopPullDownRefresh();
      if (success && response.code == 1) {
        that.setData({
          rooms: response.data,
        });
      } else {}
    }
    enquene(roomsRequest);
  },
  getDramas: function () {
    console.log("getDramas")
    let that = this;
    let dramasRequest = new ApiRequest();
    dramasRequest.apiName = "/storeMsMini/getHomeDramas";
    dramasRequest.method = 'GET';
    dramasRequest.apiCallback = function (success, response) {
      wx.stopPullDownRefresh();
      if (success && response.code == 1) {
        that.setData({
          dramas: response.data,
        });
      } else {}
    }
    enquene(dramasRequest);
  },
  getDms: function () {
    console.log("getDms")
    let that = this;
    let dmsRequest = new ApiRequest();
    dmsRequest.apiName = "/storeMsMini/getDms";
    dmsRequest.method = 'GET';
    dmsRequest.apiCallback = function (success, response) {
      wx.stopPullDownRefresh();
      if (success && response.code == 1) {
        that.setData({
          dms: response.data,
        });
      } else {}
    }
    enquene(dmsRequest);
  },
  openLocationMap: function (a) {
    var e = this.data.zuobiao;
    if (e) {
      var t = e.split(",");
      console.log(Number(t[0]));
      wx.openLocation({
        name: "杭州剧有趣西湖店",
        latitude: Number(t[0]),
        longitude: Number(t[1]),
        scale: 18,
        fail: function (a) {
          console.log(a);
        }
      });
    }
  },
  showContactSheet: function () {
    wx.showActionSheet({
      itemList: ["18888888888", "微信：juyouqu8888 (复制)"],
      success: function (a) {
        0 == a.tapIndex ? wx.makePhoneCall({
          phoneNumber: "18888888888"
        }) : 1 == a.tapIndex && wx.setClipboardData({
          data: "juyouqu8888",
          success: function (a) {}
        }), console.log(a.tapIndex);
      },
      fail: function (a) {
        console.log(a.errMsg);
      }
    });
  },
  roomsPreview: function (a) {
    for (var t = a.currentTarget.dataset.index, n = [], rooms = this.data.rooms, o = 0; o < rooms.length; o++) {
      var u = rooms[o].roomDecorate;
      n.push(u);
    }
    console.log(n);
    wx.previewImage({
      current: n[t],
      urls: n
    });
  },
});