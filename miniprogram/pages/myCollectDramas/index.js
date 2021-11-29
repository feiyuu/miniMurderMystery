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
    dramaList: [],
    tubiao: "z_moren",
    FuDongJia: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getMyCollectDramaList();
  },
  getMyCollectDramaList: function () {
    console.log("getMyCollectDramaList")
    let that = this;
    let collectDramaListRequest = new ApiRequest();
    collectDramaListRequest.apiName = "/storeMsMini/getMyCollectDramaList";
    collectDramaListRequest.method = 'GET';
    collectDramaListRequest.addParam("openid", app.globalData.userInfo.openid);
    collectDramaListRequest.apiCallback = function (success, response) {
      wx.stopPullDownRefresh();
      if (success && response.code == 1) {
        that.setData({
          dramaList: response.data,
        });
      } else {}
    }
    enquene(collectDramaListRequest);
  },
  goDramaDetail: function (data) {
    console.log("goDramaDetail===" + data.currentTarget.dataset.dramaid), wx.navigateTo({
      url: "/pages/dramaDetail/index?dramaId=" + data.currentTarget.dataset.dramaid
    });
  },
})