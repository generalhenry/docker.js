var http = require('http');
var url = require('url');

module.exports = function request (opts) {
  if (!opts.host || !opts.path || !opts.method || !opts.version) {
  	throw new Error('bad input');
  }
  var query = opts.query;
  var host = opts.host;
  var path = opts.path;
  var method = opts.method;
  var data = opts.data;
  var headers = opts.headers;
  var cb = opts.cb;
  var urlObj = url.parse(host);

  var reqOptions = {
  	method: method,
  	path: version + path + url.format({query: query}),
  	headers: headers,
  	agent: false;
  };

  if (urlObj.protocol === 'unix:') {
  	reqOptions.sockPath = urlObj.path;
  } else {
  	reqOptions.hostname = urlObj.hostname;
  	reqOptions.port = urlObj.port;
  }

  var req = http.request(reqOptions);
  if (data) {
  	req.write(JSON.stringify(data));
  }

};