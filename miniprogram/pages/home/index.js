// index.js
// const app = getApp()
var  app = getApp()

Page({
  data: {
    tubiao: "z_moren",
    movies:[  
      '/static/image/bg1.jpg',
      '/static/image/bg2.jpg',
      '/static/image/bg3.jpg',
      '/static/image/bg4.jpg',
      '/static/image/bg5.jpg',
      ],
      FangJians:[
        {
          TuPian:'/static/image/bg1.jpg',BiaoQian:'古风房间'
        },
        {
          TuPian:'/static/image/bg2.jpg',BiaoQian:'恐怖房间'
        },
        {
          TuPian:'/static/image/bg3.jpg',BiaoQian:'全息投影房'
        },
        {
          TuPian:'/static/image/bg4.jpg',BiaoQian:'榻榻米房'
        },
        {
          TuPian:'/static/image/bg4.jpg',BiaoQian:'榻榻米房'
        },
        {
          TuPian:'/static/image/bg4.jpg',BiaoQian:'榻榻米房'
        },
        {
          TuPian:'/static/image/bg4.jpg',BiaoQian:'榻榻米房'
        }
      ],
      ZhuChis:[
        {TouXiang:'https://img0.baidu.com/it/u=2380516898,174121639&fm=253&fmt=auto&app=120&f=JPEG?w=186&h=215',NiCheng:'小酒',hot:'50'},
        {TouXiang:'/static/image/bg4.jpg',NiCheng:'小酒',hot:'50'},
        {TouXiang:'/static/image/bg4.jpg',NiCheng:'小酒',hot:'50'},
        {TouXiang:'/static/image/bg4.jpg',NiCheng:'小酒',hot:'50'},
        {TouXiang:'/static/image/bg4.jpg',NiCheng:'小酒',hot:'50'},
        {TouXiang:'/static/image/bg4.jpg',NiCheng:'小酒',hot:'50'},
        {TouXiang:'/static/image/bg4.jpg',NiCheng:'小酒',hot:'50'},
        {TouXiang:'/static/image/bg4.jpg',NiCheng:'小酒',hot:'50'},
      ]
  },
  onLoad: function(a) {
    this.setData({
        tubiao: app.globalData.dpdata.TuBiao,
    });
},

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },

});
