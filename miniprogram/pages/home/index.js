// index.js
// const app = getApp()
var app = getApp(),utils = require("../../utils/util");

Page({
  data: {
    tubiao: "z_moren",
    movies: [
      'https://img1.baidu.com/it/u=1412665004,3652807320&fm=26&fmt=auto',
      'https://img1.baidu.com/it/u=3529475728,3428445648&fm=26&fmt=auto',
      'https://img1.baidu.com/it/u=3769294252,1742996689&fm=26&fmt=auto',

    ],
    rooms: [{
        roomDecorate: '/static/image/bg1.jpg',
        roomName: '古风房间',
        roomLabel: 'A02',
      },
      {
        roomDecorate: '/static/image/bg2.jpg',
        roomName: '恐怖房间',
        roomLabel: 'B02',
      },
      {
        roomDecorate: '/static/image/bg3.jpg',
        roomName: '全息投影房',
        roomLabel: 'C01',
      },
      {
        roomDecorate: '/static/image/bg4.jpg',
        roomName: '全息投影房',
        roomLabel: 'C02',
      },
      {
        roomDecorate: '/static/image/bg4.jpg',
        roomName: '全息投影房',
        roomLabel: 'C03',
      },
      {
        roomDecorate: '/static/image/bg4.jpg',
        roomName: '恐怖房间',
        roomLabel: 'B03',
      },
      {
        roomDecorate: '/static/image/bg4.jpg',
        roomName: '多功能厅',
        roomLabel: 'D01',
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
        name: "杭州巨有趣下沙店",
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
        var u = rooms[o].roomDecorate;
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