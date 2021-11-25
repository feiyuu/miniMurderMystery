const accountInfo = wx.getAccountInfoSync();
const envVersion = accountInfo.miniProgram.envVersion;
console.log(envVersion) //'develop' | 'trial' | 'release'

const URLMap= {
  develop:{
      BASE_URL:'https://test.aaa.com', 
  },
  trial:{
     BASE_URL:'https://test.aaa.com', 
  },
  release:{
     BASE_URL:'https://aaa.com', 
  }
}

module.exports = {
  host:URLMap[envVersion]
}