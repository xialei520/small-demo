function getDateAfterMonth(startDate, n){
  let year = startDate.getFullYear();
  let month = startDate.getMonth() + n;
  let date = startDate.getDate();

  if (month >= 12) {
    year = year + parseInt(month / 12);
    month = month - parseInt(month / 12) * 12;
  } 

  if(date > mGetDate(year, month+1)){
    date = mGetDate(year, month+1);
  }
  return new Date(year, month, date);
}

//计算当月有多少天
function mGetDate(year, month){
  var d = new Date(year, month, 0);
  return d.getDate();
}

//判断日期是否合法
function check(year, month, date){
  if (date <= mGetDate(year, month)) {
    return true;
  } else {
    return false;
  }
}
var nowDate = new Date()

console.log(getDateAfterMonth(new Date(2019,4,31), 22).toLocaleDateString())
// console.log(mGetDate(2021,6))