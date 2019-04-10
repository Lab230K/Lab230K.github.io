/**
 * 
 */
var lblLatitude = document.getElementById("latitude");
var lblLongitude = document.getElementById("longitude");
var lblAltitude = document.getElementById("altitude");
var lblHeading = document.getElementById("heading");
var lblSpeed = document.getElementById("speed");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    //.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  if (connection) {
    lblLatitude.innerHTML = "Latitude: " + position.coords.latitude;
    lblLongitude.innerHTML = "Longitude: "  + position.coords.longitude;    
    lblAltitude.innerHTML = "Altitude: " + position.coords.altitude;
    lblHeading.innerHTML = "Heading: " + position.coords.heading;
    lblSpeed.innerHTML = "Speed: " + position.coords.speed;
    renewalMap();
  } else {
    lblLatitude.innerHTML = "Latitude";
    lblLongitude.innerHTML = "Longitude";
    lblAltitude.innerHTML = "Altitude";
    lblHeading.innerHTML = "Heading";
    lblSpeed.innerHTML = "Speed";
  }   
}
