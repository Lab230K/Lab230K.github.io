let host = "192.168.0.1";

function connected() {
  console.log("connected");
}

function disconnected() {
  console.log("disconnected");
}

QiSession(function(session) {
  connected();
}, disconnected, host);
