let host = document.getElementById("hostip");

function connected() {
  console.log("connected");
}

function disconnected() {
  console.log("disconnected");
}

QiSession(function(session) {
  connected();
}, disconnected, host);
