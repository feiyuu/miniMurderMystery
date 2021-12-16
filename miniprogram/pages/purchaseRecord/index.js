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
    recordList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyPurchaseRecordList();
  },
  getMyPurchaseRecordList: function () {
    console.log("getMyPurchaseRecordList")
    let that = this;
    let recordBuyListRequest = new ApiRequest();
    recordBuyListRequest.apiName = "/storeMsMini/getMyPurchaseRecordList";
    recordBuyListRequest.method = 'GET';
    recordBuyListRequest.apiCallback = function (success, response) {
      wx.stopPullDownRefresh();
      if (success && response.code == 1) {
        that.setData({
          recordList: response.data,
        });
      } else {}
    }
    enquene(recordBuyListRequest);
  },

})