/**
 * app 日志打开开关
 */
const appLogSwitch = true;

export function logD(content){
  if(appLogSwitch){
    console.log(content);
  }
}

