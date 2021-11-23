const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * date 为日期Date类型，
 * 日期格式化信息 matter 定义 
 * 年:yyyy/YYYY/yy/YY
 * 月:mm/MM (不足两位用0补全)
 * 日:dd/DD (不足两位用0补全)
 * 时:hh/HH (24小时制)
 * 分:mi/MI (不足两位用0补全)
 * 秒:ss/SS (不足两位用0补全)
 */
const formatDate = function (date, matter) {
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  month = (month.length > 1) ? month : ('0' + month);
  let day = date.getDate().toString();
  day = (day.length > 1) ? day : ('0' + day);
  let hours = date.getHours().toString();
  hours = (hours.length > 1) ? hours : ('0' + hours);
  let minutes = date.getMinutes().toString();
  minutes = (minutes.length > 1) ? minutes : ('0' + minutes);
  let seconds = date.getSeconds().toString();
  seconds = (seconds.length > 1) ? seconds : ('0' + seconds);
  let retVal = matter;
  if (matter.indexOf('yyyy') >= 0) {
    retVal = retVal.replace('yyyy', year);
  } else if (matter.indexOf('YYYY') >= 0) {
    retVal = retVal.replace('YYYY', year);
  } else if (matter.indexOf('yy') >= 0) {
    retVal = retVal.replace('yy', year.substring(2));
  } else if (matter.indexOf('YY') >= 0) {
    retVal = retVal.replace('YY', year.substring(2));
  }


  if (matter.indexOf('mm') > 0) {
    retVal = retVal.replace('mm', month);
  } else if (matter.indexOf('MM') > 0) {
    retVal = retVal.replace('MM', month);
  }


  if (matter.indexOf('dd') > 0) {
    retVal = retVal.replace('dd', day);
  } else if (matter.indexOf('DD') > 0) {
    retVal = retVal.replace('DD', day);
  }


  if (matter.indexOf('hh') > 0) {
    retVal = retVal.replace('hh', hours);
  } else if (matter.indexOf('HH') > 0) {
    retVal = retVal.replace('HH', hours);
  }


  if (matter.indexOf('mi') > 0) {
    retVal = retVal.replace('mi', minutes);
  } else if (matter.indexOf('MI') > 0) {
    retVal = retVal.replace('MI', minutes);
  }


  if (matter.indexOf('ss') > 0) {
    retVal = retVal.replace('ss', seconds);
  } else if (matter.indexOf('SS') > 0) {
    retVal = retVal.replace('SS', seconds);
  }
  return retVal;
}

module.exports = {
  formatTime: formatTime,
  formatDate :formatDate
}
