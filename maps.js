/**
 * 
 */
let mapContainer = document.getElementById("map");
let map;
let alt = 16;
let bearing = 0;
let themeTime = L.Wrld.themes.time.Day;
let themeWeather = L.Wrld.themes.weather.Clear;
let resetMap = 0;
function getMap() {
  map = L.Wrld.map(mapContainer, "eec2dea82d9b479a5e8cb28007248887", {
    //For testing POI
    //Kashiwagi hights
    center: [35.701, 139.692],
      zoom: alt,
    //indoorsEnabled: true
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="">Lab230K</a> contributors'
      }).addTo(map);
  //map.setCameraTiltDegrees(0);
  let hour =  new Date().getHours();
  switch (hour) {
    case 4:
    case 5:
    case 6:
      themeTime = L.Wrld.themes.time.Dawn;
      break;      
    case 16:
    case 17:
    case 18:
      themeTime = L.Wrld.themes.time.Dusk;
      break;
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 0:
    case 1:
    case 2:
    case 3:
      themeTime = L.Wrld.themes.time.Night;
      break;    
    default:
      themeTime = L.Wrld.themes.time.Day;
  }
  //
  /*
  switch (weather) {
    case "Cloudy":
      themeWeather = L.Wrld.themes.weather.Overcast;
      break;      
    case "Rain":
      themeWeather = L.Wrld.themes.weather.Rainy;
      break;
    case "Snow":
      themeWeather = L.Wrld.themes.weather.Snowy;
      break;    
    default:
      themeWeather = L.Wrld.themes.weather.Clear;
  }
  */
  map.themes.setTime(themeTime);
  //map.themes.setWeather(themeWeather);
}  
function renewalMap() {
  lblLatitude.innerHTML = "Latitude: " + latitude;
  lblLongitude.innerHTML = "Longitude: " + longitude;
  lblAltitude.innerHTML = "Map zoom: " + alt;
  lblSpeed.innerHTML = "Speed: ?";
  lblHeading.innerHTML = "Heading: " + bearing;
  map.setView([latitude, longitude],
      alt, {
        animate: true,
  });
}
function zoomIn() {
  alt += 0.1;
  renewalMap();
}
function zoomOut() {
  alt -= 0.1;
  renewalMap();
}
function turnLeft() {
  bearing = (bearing + 355) % 360
  map.setCameraHeadingDegrees(bearing);
  lblHeading.innerHTML = "Heading: " + bearing;
}
function turnRight() {
  bearing = (bearing + 5) % 360
  map.setCameraHeadingDegrees(bearing);
  lblHeading.innerHTML = "Heading: " + bearing;
}
function simulation() {
  isLiveMode = 0;
  viewMode();
  var times = [L.Wrld.themes.time.Dawn, L.Wrld.themes.time.Day, L.Wrld.themes.time.Dusk, L.Wrld.themes.time.Night];
  var timeIndex = 0;
  var weathers = [L.Wrld.themes.weather.Clear, L.Wrld.themes.weather.Overcast, L.Wrld.themes.weather.Rainy, L.Wrld.themes.weather.Snowy];
  var weatherIndex = 0;
  var POIIndex = 1;
  latitude = POI[POIIndex][2];
  longitude = POI[POIIndex][3];
  alt = 16;
  bearing = 0;
  map.setCameraTiltDegrees(45);
  if (resetMap == 0) {
    //resetMap = 1;
    
  var timer;
  timer = setInterval(function() {
    if (resetMap == 1) {
      clearInterval(timer);
    }
    map.themes.setTime(times[timeIndex]);
    timeIndex = (timeIndex + 1) % times.length;
    map.themes.setWeather(weathers[weatherIndex]);
    weatherIndex = Math.floor( Math.random() * 4 );
    latitude = POI[POIIndex][2];
    longitude = POI[POIIndex][3];
    renewalMap();
    say(POI[POIIndex][1] + " Station");
    POIIndex = (POIIndex + 1) % POI.length;
  }, 5000);
  
  }
  //resetMap = 1;
}
function gallery() {
  isLiveMode = 0;
  viewMode();
  var times = [L.Wrld.themes.time.Dawn, L.Wrld.themes.time.Day, L.Wrld.themes.time.Dusk, L.Wrld.themes.time.Night];
  var timeIndex = 0;
  var weathers = [L.Wrld.themes.weather.Clear, L.Wrld.themes.weather.Overcast, L.Wrld.themes.weather.Rainy, L.Wrld.themes.weather.Snowy];
  var weatherIndex = 0;
  latitude = 35.701;
  longitude = 139.692;
  alt = 17;
  bearing = 0;
  document.getElementById("video").style.display = "none";
  document.getElementById("map").style.display = "block";
  renewalMap();
  
  var bounds = L.latLngBounds([35.700, 139.691], [35.702, 139.693]);
      	map.fitBounds(bounds);
  
  //map.setCameraTiltDegrees(45);
  say("Kashiwagi hights");
  
  /*var circle = L.circle([35.701, 139.692], {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5,
          radius: 400.0
      }).addTo(map);*/
  
  var polylinePoints = [
    [35.701, 139.692],
    [35.7012, 139.69229],
    [35.70153, 139.69281],
    [35.70189, 139.69301],
    [35.70173, 139.69649]
  ];
  var polyline = L.polyline(polylinePoints).addTo(map);
  
  map.on("click", function(e) {
        var latlng = e.latlng;
        //var pixelPosition = map.latLngToLayerPoint(latlng);
        alert("LatLng = " + latlng);
      });
  
  var timer;
  timer = setInterval(function() {
    if (resetMap == 1) {
      clearInterval(timer);
    }
    map.themes.setTime(times[timeIndex]);
    timeIndex = (timeIndex + 1) % times.length;
    map.themes.setWeather(weathers[weatherIndex]);
    weatherIndex = Math.floor( Math.random() * 4 );
    bearing = (bearing + 330) % 360
    map.setCameraHeadingDegrees(bearing);
    lblHeading.innerHTML = "Heading: " + bearing;
  }, 5000);  
}
function showPOI() {
  for(let i = 1; i < 31; i++) {
      var marker = L.marker([POI[i][2], POI[i][3]], { title: POI[i][1] + " Station" }).addTo(map);
  }
  latitude = 35.689475;
  longitude = 139.700349;
  alt = 10;
  renewalMap();
}
