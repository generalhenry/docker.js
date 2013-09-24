var request = require('request')
var resolve = require('url').resolve
var querystring = require('querystring')

module.exports = function(url) {

  var host = opts.host || "http://localhost:4243";

  return (function (host) {

    function genFunction(o) {

      var basePath = o.path
      var method = o.method
      var statusCodes = o.codes

      // Supported signatures:
      // function("id", cb)
      // function({JSON options}, cb)
      // function({JSON options})
      // function(cb)
      return function(opts, id, cb) {
        var path = basePath;
        // Signature: function(cb)
        if (typeof(opts) === 'function') {
          cb = opts
          var url = resolve(host, path)
          request({url: url, json: true, method:method}, function(err, res, json) {
            return checkStatus(err, res, json, cb)
          })
        }

        // Signature: function(opts)
        // returns request for streaming
        else if (typeof(opts) === 'object' && typeof(id) === 'undefined') {
          if (opts.id) {
            path = path.replace("{{id}}", opts.id)
            delete opts.id
          }
          if (opts.queryParams) {
            path += '?' + querystring.stringify(opts.queryParams)
            delete opts.queryParams
          }
          var url = resolve(host, path)
          return request({url: url, json: opts, method: method})
        }

        // Signature: function(opts, cb)
        else if (typeof(opts) === 'object' && typeof(id) === 'function') {
          cb = id
          if (opts.id) {
            path = path.replace("{{id}}", opts.id)
            delete opts.id
          }
          if (opts.queryParams) {
            path += '?' + querystring.stringify(opts.queryParams)
            delete opts.queryParams
          }
          
          var url = resolve(host, path)
          request({url: url, json: opts, method: method}, function(err, res, json) {
            return checkStatus(err, res, json, cb)
          })
        }

        // Signature: function(id, cb)
        else if (typeof(opts) === 'string' && typeof(id) === 'function') {
          cb = id
          id = opts
          path = path.replace("{{id}}", id)
          var url = resolve(host, path)
          request({url: url, json: true, method:method}, function(err, res, json) {
            return checkStatus(err, res, json, cb)
          })
        }
      }
    }


    return )(host);

}
