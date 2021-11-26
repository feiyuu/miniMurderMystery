// index.js
// const app = getApp()
var app = getApp(),utils = require("../../utils/util");

Page({
  data: {
    tubiao: "z_moren",
    movies: [
      '/static/image/bg1.jpg',
      '/static/image/bg2.jpg',
      '/static/image/bg3.jpg',
      '/static/image/bg4.jpg',
      '/static/image/bg5.jpg',
    ],
    rooms: [{
        decorate: '/static/image/bg1.jpg',
        name: '古风房间',
        label: 'A02',
      },
      {
        decorate: '/static/image/bg2.jpg',
        name: '恐怖房间',
        label: 'B02',
      },
      {
        decorate: '/static/image/bg3.jpg',
        name: '全息投影房',
        label: 'C01',
      },
      {
        decorate: '/static/image/bg4.jpg',
        name: '全息投影房',
        label: 'C02',
      },
      {
        decorate: '/static/image/bg4.jpg',
        name: '全息投影房',
        label: 'C03',
      },
      {
        decorate: '/static/image/bg4.jpg',
        name: '恐怖房间',
        label: 'B03',
      },
      {
        decorate: '/static/image/bg4.jpg',
        name: '多功能厅',
        label: 'D01',
      }
    ],
    ZhuChis: [{
        TouXiang: 'https://img0.baidu.com/it/u=2380516898,174121639&fm=253&fmt=auto&app=120&f=JPEG?w=186&h=215',
        NiCheng: '小酒',
        hot: '50'
      },
      {
        TouXiang: '/static/image/bg4.jpg',
        NiCheng: '小酒',
        hot: '50'
      },
      {
        TouXiang: '/static/image/bg4.jpg',
        NiCheng: '小酒',
        hot: '50'
      },
      {
        TouXiang: '/static/image/bg4.jpg',
        NiCheng: '小酒',
        hot: '50'
      },
      {
        TouXiang: '/static/image/bg4.jpg',
        NiCheng: '小酒',
        hot: '50'
      },
      {
        TouXiang: '/static/image/bg4.jpg',
        NiCheng: '小酒',
        hot: '50'
      },
      {
        TouXiang: '/static/image/bg4.jpg',
        NiCheng: '小酒',
        hot: '50'
      },
      {
        TouXiang: '/static/image/bg4.jpg',
        NiCheng: '小酒',
        hot: '50'
      },
    ],
    zuobiao: '	30.267212111052405,120.18522941925167'
  },
  onLoad: function (a) {
    this.setData({
      tubiao: app.globalData.dpdata.TuBiao,
    });
  },

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },
  openLocationMap: function (a) {
    var e = this.data.zuobiao;
    if (e) {
      var t = e.split(",");
      console.log(Number(t[0]));
      wx.openLocation({
        name: "巨有趣",
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
  roomsIntro: function(a) {
    for (var t = a.currentTarget.dataset.index, n = [], rooms = this.data.rooms, o = 0; o < rooms.length; o++) {
        var u = rooms[o].decorate;
        console.log("rooms===="+rooms);
        console.log("rooms[o]===="+rooms[o]);
        n.push(u);
    }
    console.log(n);
    wx.previewImage({
        current: n[t],
        urls: n
    });
},
});