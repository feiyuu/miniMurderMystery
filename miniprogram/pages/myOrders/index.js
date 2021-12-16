// index.js
const app = getApp()
import {
  ApiRequest,
  enquene
} from '../../doframework/network/ApiManager';

Page({
  data: {
    tubiao: "z_moren",
    orderList: [],
    orderList10: [],
    orderList30: [],
    orderList40: [],
    orderList50: [],
    currentTab: 1,
  },
  swichNav: function (e) {
    console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })

  },
  getMyOrderList: function () {
    console.log("getMyorderList")
    let that = this;
    let orderListRequest = new ApiRequest();
    orderListRequest.apiName = "/storeMsMini/getMyOrderList";
    orderListRequest.method = 'GET';
    orderListRequest.apiCallback = function (success, response) {
      wx.stopPullDownRefresh();
      if (success && response.code == 1) {
        let list10 = [];
        let list30 = [];
        let list40 = [];
        let list50 = [];
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].goods) {
            response.data[i].goods = JSON.parse(response.data[i].goods);
          }
        }
        const list = response.data;
        for (var i = 0; i < list.length; i++) {
          if (list[i].state == 10) {
            list10.push(list[i]);
          } else if (list[i].state == 30) {
            list30.push(list[i]);
          } else if (list[i].state == 40) {
            list40.push(list[i]);
          } else if (list[i].state == 50) {
            list50.push(list[i]);
          }
        }
        that.setData({
          orderList: response.data,
          orderList10: list10,
          orderList30: list30,
          orderList40: list40,
          orderList50: list50,
        });
      } else {}
    }
    enquene(orderListRequest);
  },

  onShow: function () {
    this.getMyOrderList();
  },
  onPullDownRefresh: function () {
    this.getMyOrderList();
  },
  goTeamDetail: function (data) {
    console.log("goorderDetail===" + data.currentTarget.dataset.orderid), wx.navigateTo({
      url: "/pages/orderDetail/index?orderId=" + data.currentTarget.dataset.orderid
    });
  },
  onLoad: function (param) {

  },
});