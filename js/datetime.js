/**
 * 
 */
var lblDatetime = document.getElementById("datetime");

function showTime() {
  lblDatetime.innerHTML = new Date();
  setTimeout("showTime()", 1000);  
}

showTime();
