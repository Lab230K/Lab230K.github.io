const {EchoRequest, EchoResponse} = require('./echo_pb.js');
const {EchoServiceClient} = require('./echo_grpc_web_pb.js');

let echoService = new EchoServiceClient('http://localhost:8080');

let request = new EchoRequest();
request.setMessage('Hello World!');

echoService.echo(request, {}, function(err, response) {
  // ...
});
