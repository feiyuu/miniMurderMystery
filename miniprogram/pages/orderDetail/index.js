// pages/orderDetail/index.js
import {
  ApiRequest,
  enquene
} from '../../doframework/network/ApiManager';
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {},
    orderId: '',
    showPay: !1,
    balance: "",
    position: 0,
    isCanPay: !0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      orderId: options.orderId
    }, () => {
      that.getOrderDetail();
    });

  },
  getOrderDetail: function () {
    console.log("getOrderDetail")
    let that = this;
    let getOrderDetailRequest = new ApiRequest();
    getOrderDetailRequest.apiName = "/storeMsMini/getOrderDetail";
    getOrderDetailRequest.method = 'GET';
    getOrderDetailRequest.addParam("orderId", that.data.orderId);
    getOrderDetailRequest.apiCallback = function (success, response) {
      wx.stopPullDownRefresh();
      if (success && response.code == 1) {
        response.data.goods = JSON.parse(response.data.goods);
        that.setData({
          orderDetail: response.data,
        });
      } else {}
    }
    enquene(getOrderDetailRequest);
  },
  cancelOrder: function () {
    this.updateOrder(50);
  },
  updateOrder(state) {
    console.log("cancelOrder")
    let that = this;
    let cancelRequest = new ApiRequest();
    cancelRequest.apiName = "/storeMsMini/updaTeOrder";
    cancelRequest.method = 'POST';
    cancelRequest.addParam("orderId", that.data.orderId);
    cancelRequest.addParam("state", state);
    cancelRequest.apiCallback = function (success, response) {
      wx.stopPullDownRefresh();
      if (success && response.code == 1) {
        wx.showToast({
          title: state == 30 ? "支付成功" : "取消成功",
          icon: "success",
          success: function () {
            setTimeout(() => {
              wx.navigateBack({})
            }, 1000);
          }
        })
      } else {}
    }
    enquene(cancelRequest);
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
        }, () => {
          that.setData({
            showPay: !0
          });
        }), that.data.orderDetail.total_price > response.data && that.setData({
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
      let payRequest = new ApiRequest();
      payRequest.apiName = "/storeMsMini/payCharge";
      payRequest.method = 'POST';
      payRequest.addParam("recordUserId", app.globalData.userInfo.openid);
      payRequest.addParam("isBlance", 0 == that.data.position);
      payRequest.addParam("charge", that.data.orderDetail.total_price);
      payRequest.addParam("recordName", "在小卖铺消费：-" + that.data.orderDetail.total_price);
      payRequest.apiCallback = function (success, response) {
        wx.hideLoading({})
        if (success && response.code == 1) {
          that.paying = !1, that.updateOrder(30), that.setData({
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
        enquene(payRequest);
      }, 1500);
    }
  },
  select: function (t) {
    this.data.isCanPay ? this.setData({
      position: t.currentTarget.dataset.ep
    }) : wx.showToast({
      title: "余额不足",
      icon: "none"
    });
  },
})