// index.js
const app = getApp()
import {
  ApiRequest,
  enquene
} from '../../doframework/network/ApiManager';

Page({
  data: {
    tubiao: "z_moren",
    teamList: []
  },

  getTeamList: function () {
    console.log("getTeamList")
    let that = this;
    let teamListRequest = new ApiRequest();
    teamListRequest.apiName = "/storeMsMini/getTeamList";
    teamListRequest.method = 'GET';
    teamListRequest.apiCallback = function (success, response) {
      wx.stopPullDownRefresh();
      if (success && response.code == 1) {
        that.setData({
          teamList: response.data
        });
        console.log("teamListRequest")
      } else {}
    }
    enquene(teamListRequest);
  },
  
  onShow: function () {
    app.globalData.userInfo ? this.getTeamList() : this.setData({
      showModal: !app.globalData.userInfo
    });
  },
  bindauthEvent: function () {
    this.getTeamList();
  },
  onPullDownRefresh: function () {
    this.getTeamList();
  },
  goTeamDetail: function (data) {
    console.log("goDramaDetail===" + data.currentTarget.dataset.teamid), wx.navigateTo({
        url: "/pages/dramaDetail/index?teamId=" + data.currentTarget.dataset.teamid
    });
},

});