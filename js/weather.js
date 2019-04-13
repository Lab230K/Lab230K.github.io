/**
 * 
 */
let lat;
let lon;
let xhr;

function getWeather() {
  xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var response = JSON.parse(this.responseText);
    var city = response.city.name + ", " + response.city.country;
    const weatherTitle = response.list[0].weather[0].main;
    var temp = response.list[0].main.temp + "°";
    
    var weatherContainer = document.getElementById("weather");
    weatherContainer.innerHTML = city + " " + weatherTitle + " " + temp;
    weather = weatherTitle;
    //
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
    map.themes.setWeather(themeWeather);
    //
  };
  xhr.open(
    "GET",
    "https://api.openweathermap.org/data/2.5/forecast?APPID=9c39fa3ce9d953fdd507d7d9f77093ef&units=metric" + lat + lon, 
    true
  );
  xhr.send();
}
function getLocation() {
  xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDIHHXeYB_Hsf21AAaQX8qd5Y2NDsckUbI",
    true
  );
  xhr.onload = function() {
    // do something
    var response = JSON.parse(this.responseText);
    lat = "&lat=" + response.location.lat;
    lon = "&lon=" + response.location.lng;
    latitude = response.location.lat;
    longitude = response.location.lng;
    getWeather();
  };
  xhr.send();
}

getLocation(); 
