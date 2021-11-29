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
    showPay: !1,
    balance: "",
    position: 0,
    isCanPay: !0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getGoods();
  },
  bindauthEvent: function () {
    this.getBalance();
  },
  settleAccounts: function () {
    if (this.data.totalPrice <= 0) {
      wx.showToast({
        title: '请选择商品',
        icon: "none"
      })
      return;
    }
    app.globalData.userInfo && app.globalData.userInfo.openid ? this.getBalance(): this.setData({
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
  settleAccountsAfter: function () {
    let goodsListTemp = this.data.goodsList;
    for (var i = 0; i < goodsListTemp.length; i++) {
      goodsListTemp[i].count = 0;
    }
    this.setData({
      totalCount: 0,
      totalPrice: 0,
      goodsList: goodsListTemp,
    });
  },
  getGoods: function () {
    console.log("getGoods")
    let that = this;
    let recordBuyListRequest = new ApiRequest();
    recordBuyListRequest.apiName = "/storeMsMini/getGoods";
    recordBuyListRequest.method = 'GET';
    recordBuyListRequest.apiCallback = function (success, response) {
      wx.stopPullDownRefresh();
      if (success && response.code == 1) {
        that.setData({
          goodsList: response.data,
        });
      } else {}
    }
    enquene(recordBuyListRequest);
  },
  select: function (t) {
    this.data.isCanPay ? this.setData({
      position: t.currentTarget.dataset.ep
    }) : wx.showToast({
      title: "余额不足",
      icon: "none"
    });
  },
  getBalance: function () {
    console.log("getBalance")
    let that = this;
    let balanceRequest = new ApiRequest();
    balanceRequest.apiName = "/storeMsMini/getBalanceUser";
    balanceRequest.method = 'GET';
    balanceRequest.addParam("openid", app.globalData.userInfo.openid);
    balanceRequest.apiCallback = function (success, response) {
      if (success && response.code == 1) {
        that.setData({
          balance: response.data
        },()=>{
          that.setData({
            showPay: !0
          });
        }), that.data.totalPrice > response.data && that.setData({
          isCanPay: !1,
          position: 1
        });
      } else {}
    }
    enquene(balanceRequest);
  },
  pay: function () {
    var that = this;
    if (!that.paying) {
      that.paying = !0
      let loginRequest = new ApiRequest();
      loginRequest.apiName = "/storeMsMini/payCharge";
      loginRequest.method = 'POST';
      loginRequest.addParam("recordUserId", app.globalData.userInfo.openid);
      loginRequest.addParam("isBlance", 0 == that.data.position);
      loginRequest.addParam("charge", that.data.totalPrice);
      loginRequest.addParam("recordName", "在小卖铺消费：-" + that.data.totalPrice);
      loginRequest.apiCallback = function (success, response) {
        wx.hideLoading({})
        if (success && response.code == 1) {
          that.paying = !1, wx.showToast({
            title: "支付成功",
            icon: "success",
            success: function () {
              that.settleAccountsAfter();
            }
          }), that.setData({
            showPay: !1
          });
        } else {
          that.paying = !1, wx.showToast({
            title: "支付失败",
            icon: "none"
          });
        }
      }
      wx.showLoading({
        title: "支付中..."
      });
      setTimeout(function () {
        enquene(loginRequest);
      }, 1500);
    }
  },
})