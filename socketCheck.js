var http = require('http');

http.createServer(function (req, res) {
  res.end('yolo');
}).listen('/var/run/docker.sock');