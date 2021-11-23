/**
 * api 管理器
 */
import DoApiRequest from "./DoApiRequest.js";
import {ReverseAESDecrypt} from '../util/DoCrypto.js';

/**
 * api host
 */
const API_SERVER_HOST = "";


function enquene(request){
    // 发出真正的请求
    let req = request.getApiRequestParam();
    let cid = request.cid;
    let apiName = request.apiName;
    let apiMethod = request.method;
    
    var callback = function(res) {
        // 先判断http 是否成功
        if(res.statusCode != 200){
            console.log("http --err ");
            // 网络请求失败，统一封装处理
            request.apiCallback(true,null);
            return ;
        }
        // 判断是否是 ErrorCode.  如果是，那么没法处理，直接打回
        let responseContent = res.data;
        var fdStart = responseContent.indexOf("error.0x");
        if(fdStart == 0){
            // 以错误标识开头
            return ;
        }
        
        responseContent = responseContent.replace(/-/g,'+');
        responseContent = responseContent.replace(/_/g,'/');
        let contentObj = ReverseAESDecrypt(responseContent);
        contentObj = JSON.parse(contentObj);
        // 判断是否存在，框架层异常
        if(contentObj.code == 0){
            // 提取session id并且储存到本地
            wx.setStorage({
                key:"do_fw_api_sid",
                data:contentObj.sid
              });
            // 接口请求成功
            request.apiCallback(true,contentObj.content);
        }else{
            // 这种情况下，要根据code 进行架构层的动作响应
            var msgObj = JSON.parse(contentObj.msg);

            switch(contentObj.code){
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
                    msgObj.complete= function(){
                        wx.navigateBack({
                          delta: 1,
                        })
                    }
                    wx.showToast(msgObj);
                    break;
                case 202:
                    //modal and close
                    msgObj.complete= function(){
                        wx.navigateBack({
                          delta: 1,
                        })
                    }
                    wx.showModal(msgObj);
                    break;
                case 301:
                    // 用户尚未登录
                    msgObj.complete = function(res){
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
            request.apiCallback(false,null);
        }
       
    };
    if(apiMethod == "GET"){

        let apiUrl = API_SERVER_HOST+apiName + '?req=' + req + '&cid=' + cid;

        wx.request({
            url: apiUrl,
            method:apiMethod,
            success: function (res) {
                callback(res);
            },
            fail: function (res) {
                request.apiCallback(false,res);
            }
        });
    }else{
        let apiUrl = API_SERVER_HOST+apiName;
        
        wx.request({
            url: apiUrl,
            method:apiMethod,
            data:{
                "req":req,
                "cid":cid  
            },
            header:{
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                callback(res);
            },
            fail: function (res) {
                request.apiCallback(false,null);
            }
          });
    }
    
    
}


function enqueneUpload(request){
    // 发出真正的请求
    let req = request.getApiRequestParam();
    let cid = request.cid;
    let apiName = request.apiName;
    let apiMethod = "POST";
    

    var callback = function(res) {
        
		console.log("res.statusCode " + res.statusCode);
        if(res.statusCode != 200){
            // 网络请求失败，统一封装处理
            request.apiCallback(true,null);
            return ;
        }

        let responseContent = res.data;
		console.log("responseContent " + responseContent);
        var fdStart = responseContent.indexOf("error.0x");
        if(fdStart == 0){
            // 以错误标识开头
			request.apiCallback(true,null);
            return ;
        }

        responseContent = responseContent.replace(/-/g,'+');
        responseContent = responseContent.replace(/_/g,'/');
        let contentObj = ReverseAESDecrypt(responseContent);
        contentObj = JSON.parse(contentObj);

        if(contentObj.code == 0){
            // 接口请求成功
            request.apiCallback(true,contentObj.content);
        }else{
            // 这种情况下，要根据code 进行架构层的动作响应
            switch(contentObj.code){
                case 101:
                    alert(contentObj.msg);
                    break;
                case 102:
                    alert(contentObj.msg);
                    break;
                case 201:
                    break;
                case 301:
                    break;
                case 302:
                    break;
                case 401:
                    break;
                case 402:
                    break;
            }
            request.apiCallback(false,null);
        }
       
    };
    
        let apiUrl = API_SERVER_HOST+apiName;
        
		
		wx.uploadFile({ //上传图片
			url: apiUrl,
			filePath: request.file,  
			
			formData:{
				"req":req,
				"cid":cid
			},
			name: request.name,
			success: (res) => {
				callback(res);
			},
			fail:(res) =>{
				request.apiCallback(false,null);
			}
		});
    
}


export {DoApiRequest,enquene,enqueneUpload};
