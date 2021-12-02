// pages/purchaseRecord/index.js
const app = getApp()
import {
  ApiRequest,
  enquene
} from '../../doframework/network/ApiManager';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    totalPrice: 0,
    totalCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getGoods();
  },

  bindauthEvent: function () {
    this.settleAccounts();
  },
  settleAccounts: function () {
    if (this.data.totalPrice <= 0) {
      wx.showToast({
        title: '请选择商品',
        icon: "none"
      })
      return;
    }
    app.globalData.userInfo && app.globalData.userInfo.openid ? this.placeOrder() : this.setData({
      showModal: !0
    });
  },

  plus: function (data) {
    let that = this;
    let goodsListTemp = this.data.goodsList;
    goodsListTemp[data.currentTarget.dataset.index].count ? goodsListTemp[data.currentTarget.dataset.index].count += 1 : goodsListTemp[data.currentTarget.dataset.index].count = 1;
    this.setData({
      goodsList: goodsListTemp,
    }, () => {
      that.calculation();
    });
  },
  reduce: function (data) {
    let goodsListTemp = this.data.goodsList;
    let that = this;
    goodsListTemp[data.currentTarget.dataset.index].count -= 1;
    this.setData({
      goodsList: goodsListTemp,
    }, function () {
      that.calculation();
    });
  },
  calculation: function () {
    let goodsListTemp = this.data.goodsList;
    let counts = 0;
    let prices = 0;
    for (var i = 0; i < goodsListTemp.length; i++) {
      if (goodsListTemp[i].count && goodsListTemp[i].count > 0) {
        counts += goodsListTemp[i].count;
        prices += goodsListTemp[i].price * goodsListTemp[i].count;
      }
    }
    this.setData({
      totalCount: counts,
      totalPrice: prices,
    });
  },
  placeOrder: function () {
    let goodsListTemp = this.data.goodsList;
    let goods = [];
    for (var i = 0; i < goodsListTemp.length; i++) {
      if (goodsListTemp[i].count && goodsListTemp[i].count > 0) {
        goods.push({
          count: goodsListTemp[i].count,
          price: goodsListTemp[i].price,
          goodsName: goodsListTemp[i].goodsName,
          goodsCoverUrl: goodsListTemp[i].goodsCoverUrl,
        });
      }
    }
    goods = JSON.stringify(goods);
    let that = this;
    let placeOrderRequest = new ApiRequest();
    placeOrderRequest.apiName = "/storeMsMini/placeOrder";
    placeOrderRequest.method = 'POST';
    placeOrderRequest.addParam("userId", app.globalData.userInfo.openid);
    placeOrderRequest.addParam("total_price", that.data.totalPrice);
    placeOrderRequest.addParam("goods", goods);
    placeOrderRequest.apiCallback = function (success, response) {
      if (success && response.code == 1) {
        let goodsListTemp = that.data.goodsList;
        for (var i = 0; i < goodsListTemp.length; i++) {
          goodsListTemp[i].count = 0;
        }
        that.setData({
          totalCount: 0,
          totalPrice: 0,
          goodsList: goodsListTemp,
        });
        console.log("response.data.orderId=="+response.data.orderId);
        wx.navigateTo({
          url: "/pages/orderDetail/index?orderId="+response.data.orderId,
        });
      } else {

      }
    }
    enquene(placeOrderRequest);
  },
  getGoods: function () {
    console.log("getGoods")
    let that = this;
    let getGoodsListRequest = new ApiRequest();
    getGoodsListRequest.apiName = "/storeMsMini/getGoods";
    getGoodsListRequest.method = 'GET';
    getGoodsListRequest.apiCallback = function (success, response) {
      wx.stopPullDownRefresh();
      if (success && response.code == 1) {
        that.setData({
          goodsList: response.data,
        });
      } else {}
    }
    enquene(getGoodsListRequest);
  },

})