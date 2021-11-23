import {AESEncrypt} from '../util/DoCrypto.js';
import {SHA256Encode} from '../util/DoCrypto.js';
import {ReverseAESEncrypt,ReverseAESDecrypt} from '../util/DoCrypto.js';

class DoApiRequest{

    constructor(){
        this.cid = "100001";
        this.appversion= "1210";
        // this.sid = "";
        // 这里要从本地读取sid
        this.sid = wx.getStorageSync('do_fw_api_sid');
        this.p = "";
        this.sign = "";
        this.apiName = "";
        this.method = "POST";
        this.callback = null;
        this.map = new Map();
        // 记录时间戳
		var dateNow = new Date();
        this.time = dateNow.getTime();
        
    }

    addParam(keyName,keyValue){
        // 设置参数
        this.map.set(keyName,keyValue)
    }
    _strMapToObj(strMap){
        let obj= Object.create(null);
        for (let[k,v] of strMap) {
          obj[k] = v;
        }
        return obj;
      }
      /**
      *map转换为json
      */
    _mapToJson(map) {
      return JSON.stringify(this._strMapToObj(map));
    }


    getApiRequestParam(){
        // 第一步先排序，加密
        var arrayObj = Array.from(this.map);
        console.log("sortString  ---  " + arrayObj);
        // 排序业务参数
        arrayObj.sort(function(a,b){
            // 根据key 比较大小，d开头最大
            if(a[0].length < b[0].length){
                return -1;
            }
            return a[0].localeCompare(b[0]);
        });
        
        this.map = new Map(arrayObj.map(function(item){
            return[item[0],item[1]];
        }));
        let sortString = this._mapToJson(this.map);
        
        // 得到了加密后p参数
        this.p = AESEncrypt(sortString);

    
        // 第二步拼装公共参数
        let bigMap = new Map();
        bigMap.set("appversion",this.appversion);
        bigMap.set("cid",this.cid);
        bigMap.set("p",this.p);
        bigMap.set("sid",this.sid);
        bigMap.set("time",this.time);

        // 第三步，计算签名
        let reqMapJson = this._mapToJson(bigMap);
        let sourceSignContent = this.appversion + this.cid + this.p + this.sid + this.time;
        var signWord = SHA256Encode(sourceSignContent);
        this.sign = signWord;       
        bigMap.set("sign",this.sign);
        reqMapJson = this._mapToJson(bigMap);
        // 对reqMapJson加密，并且返回
        var tempReq = ReverseAESEncrypt(reqMapJson);
        // 对req进行url encode操作
        tempReq = tempReq.replace(/\+/g,'-');
        tempReq = tempReq.replace(/\//g,'_');
        this.req = tempReq;
        // 尝试解密
        tempReq = this.req.replace(/-/g,'+');
        tempReq = tempReq.replace(/_/g,'/');

        return this.req;
    }

}


export default DoApiRequest;