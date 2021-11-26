/**
 * api 管理器
 */
import ApiRequest from "./ApiRequest.js";

/**
 * api host
 */
const API_SERVER_HOST = "http://127.0.0.1:7001";

function enquene(request) {
    wx.showLoading({
      title: '',
    })
    // 发出真正的请求
    let req = request.getApiRequestParam();
    let apiName = request.apiName;
    let apiMethod = request.method;
    
    var callback = function (res) {
        console.log("callback=====================" + JSON.stringify(res));
        request.apiCallback(true, res)
        return;

        // 先判断http 是否成功
        // if (res.statusCode != 200) {
        //     console.log("http --err ");
        //     // 网络请求失败，统一封装处理
        //     request.apiCallback(true, {
        //         code: 0
        //     });
        //     return;
        // }


        // 判断是否是 ErrorCode.  如果是，那么没法处理，直接打回
        let responseContent = res.data;
        var fdStart = responseContent.indexOf("error.0x");
        if (fdStart == 0) {
            // 以错误标识开头
            return;
        }

        // 判断是否存在，框架层异常
        if (contentObj.code == 0) {
            // 提取session id并且储存到本地
            wx.setStorage({
                key: "do_fw_api_sid",
                data: contentObj.sid
            });
            // 接口请求成功
            request.apiCallback(true, contentObj.content);
        } else {
            // 这种情况下，要根据code 进行架构层的动作响应
            var msgObj = JSON.parse(contentObj.msg);

            switch (contentObj.code) {
                case 101:
                    // just toast
                    wx.showToast(msgObj);
                    break;
                case 102:
                    // just modal
                    wx.showModal(msgObj);
                    break;
                case 201:
                    // toast and close
                    msgObj.complete = function () {
                        wx.navigateBack({
                            delta: 1,
                        })
                    }
                    wx.showToast(msgObj);
                    break;
                case 202:
                    //modal and close
                    msgObj.complete = function () {
                        wx.navigateBack({
                            delta: 1,
                        })
                    }
                    wx.showModal(msgObj);
                    break;
                case 301:
                    // 用户尚未登录
                    msgObj.complete = function (res) {
                        wx.switchTab({
                            url: '/pages/main/mine/mine',
                        });
                    }
                    wx.showModal(msgObj)

                    break;
                case 401:
                    // 暂无实现
                    break;

            }
            request.apiCallback(false, null);
        }

    };
    console.log("enquene===================");

    console.log("req----"+apiName+"-----"+apiMethod+"===:" +  JSON.stringify(req));

    if (apiMethod == "GET") {
        let apiUrl = API_SERVER_HOST + apiName;
        wx.request({
            url: apiUrl,
            method: apiMethod,
            data: req,
            success: function (res) {
                wx.hideLoading({
                    success: (res) => {},
                });
                callback(res.data);
            },
            fail: function (res) {
                wx.hideLoading({
                    success: (res) => {},
                });
                request.apiCallback(false, res);
            }
        });
    } else {
        let apiUrl = API_SERVER_HOST + apiName;
        wx.request({
            url: apiUrl,
            method: apiMethod,
            data: req,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                wx.hideLoading({
                    success: (res) => {},
                });
                callback(res.data);
            },
            fail: function (res) {
                wx.hideLoading({
                    success: (res) => {},
                });
                request.apiCallback(false, null);
            }
        });
    }


}

export {
    ApiRequest,
    enquene
};