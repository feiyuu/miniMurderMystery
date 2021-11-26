class ApiRequest {

  constructor() {
    this.cid = "100001";
    this.appversion = "1125";
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

  addParam(keyName, keyValue) {
    // 设置参数
    this.map.set(keyName, keyValue)
  }
  _strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
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
  getApiRequestParam() {
    console.log(" getApiRequestParam：this.map====================" +  JSON.stringify(this._strMapToObj(this.map)));
    return this.map;
  }
}


export default ApiRequest;