function getCSV(){
  let req = new XMLHttpRequest();
  req.open("get", "theYamanoteLineDDCoordinates.csv", true);
  req.send(null);
  req.onload = function(){
    convertCSVtoArray(req.responseText);
  }
}
function convertCSVtoArray(str){
  let tmp = str.split("\n");
  for(let i = 0;i < tmp.length;++i){
    POI[i] = tmp[i].split(',');
  }
  //showResult();
}
//for check result
function showResult() {
  for(let i = 0; i < 30; i++) {
    //for(let j = 0; j < 4; j++) {
      //alert(POI[i][j]);
      //var marker = L.marker([POI[i][2],POI[i][3]], { title: POI[i][1] + "Station" }).addTo(map);
    //}
  }
}

getCSV();
