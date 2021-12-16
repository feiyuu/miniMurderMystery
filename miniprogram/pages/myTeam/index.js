// index.js
const app = getApp()
import {
  ApiRequest,
  enquene
} from '../../doframework/network/ApiManager';

Page({
  data: {
    tubiao: "z_moren",
    teamList: [],
    teamList10: [],
    teamList30: [],
    teamList50: [],
    currentTab: 0,
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
  getMyTeamList: function () {
    console.log("getMyTeamList")
    let that = this;
    let teamListRequest = new ApiRequest();
    teamListRequest.apiName = "/storeMsMini/getMyTeamList";
    teamListRequest.method = 'GET';
    teamListRequest.apiCallback = function (success, response) {
      wx.stopPullDownRefresh();
      if (success && response.code == 1) {

        let list10 = [];
        let list30 = [];
        let list50 = [];
        const list = response.data;

        for (var i = 0; i < list.length; i++) {
          console.log("list[i].status==============" + list[i].status);
          if (list[i].status == 10) {
            list[i].joinedMy = 1;
            list10.push(list[i]);
          } else if (list[i].status == 30) {
            list30.push(list[i]);
          } else if (list[i].status == 50) {
            list50.push(list[i]);
          }
        }
        that.setData({
          teamList: response.data,
          teamList10: list10,
          teamList30: list30,
          teamList50: list50,
        });
      } else {}
    }
    enquene(teamListRequest);
  },

  onShow: function () {
    this.getMyTeamList();
  },
  onPullDownRefresh: function () {
    this.getMyTeamList();
  },
  goTeamDetail: function (data) {
    console.log("goDramaDetail===" + data.currentTarget.dataset.teamid), wx.navigateTo({
      url: "/pages/dramaDetail/index?teamId=" + data.currentTarget.dataset.teamid
    });
  },
  onLoad: function (param) {
    this.setData({
      currentTab: param.currentTab ? param.currentTab : 0
    });
  },
});