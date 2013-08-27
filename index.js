var request = require('request')
var resolve = require('url').resolve
var querystring = require('querystring')

module.exports = function(opts) {

  var host = opts.host || "http://localhost:4243";

  return (function (host) {

    function genFunction(o) {

      var basePath = o.path
      var method = o.method
      var statusCodes = o.codes

      function verifyStatus(s) {
        if (s in statusCodes) {
          return {status: statusCodes[s] === true, msg: statusCodes[s] }
        }

        return {status: false, msg:null}
      }

      function checkStatus(err, res, json, cb) {
        if (err) return cb(err, null)
        var s = verifyStatus(res.statusCode.toString())
        if (!s.status) {
          var msg = "HTTP response code is " + res.statusCode +
            " which indicates an error"
          if (s.msg) msg += ": " + s.msg
          var error = new Error(msg);
          return cb(error, json)
        }
        cb(null, json)
      }

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


    return {
      // CONTAINER
      listContainers: genFunction({
        path: '/containers/json',
        method: 'GET',
        codes: {200:true, 400:"bad parameter", 500:"server error"}
      }),
      createContainer: genFunction({
        path: '/containers/create',
        method: 'POST',
        codes: {201:true, 404:"no such image", 500:"server error"}
      }),
      inspectContainer: genFunction({
        path: '/containers/{{id}}/json',
        method: 'GET',
        codes: {200:true, 404:"no such container", 500:"server error"}
      }),
      inspectContainerChanges: genFunction({
        path: '/containers/{{id}}/changes',
        method: 'GET',
        codes: {200:true, 404:"no such container", 500:"server error"}
      }),
      exportContainer: genFunction({
        path: '/containers/{{id}}/export',
        method: 'GET',
        codes: {200:true, 404:"no such container", 500:"server error"}
      }),
      startContainer: genFunction({
        path: '/containers/{{id}}/start',
        method: 'POST',
        codes: {200:true, 204:true, 404:"no such container", 500:"server error"}
      }),
      stopContainer: genFunction({
        path: '/containers/{{id}}/stop',
        method: 'POST',
        codes: {200:true, 204:true, 404:"no such container", 500:"server error"}
      }),
      restartContainer: genFunction({
        path: '/containers/{{id}}/restart',
        method: 'POST',
        codes: {204:true, 404:"no such container", 500:"server error"}
      }),
      killContainer: genFunction({
        path: '/containers/{{id}}/kill',
        method: 'POST',
        codes: {204:true, 404:"no such container", 500:"server error"}
      }),
      attachToContainer: genFunction({
        path: '/containers/{{id}}/attach',
        method: 'POST',
        codes: {200:true, 400:"bad parameter", 404:"no such container", 500:"server error"}
      }),
      waitContainer: genFunction({
        path: '/containers/{{id}}/wait',
        method: 'POST',
        codes: {200:true, 404:"no such container", 500:"server error"}
      }),
      removeContainer: genFunction({
        path: '/containers/{{id}}',
        method: 'DELETE',
        codes: {204:true, 400:"bad parameter", 404:"no such container", 500:"server error"}
      }),
      // IMAGES
      listImages: genFunction({
        path: '/images/json',
        method: 'GET',
        codes: {200:true, 400:"bad parameter", 500:"server error"}
      }),
      createImage: genFunction({
        path: '/images/create',
        method: 'POST',
        codes: {200:true, 400:"bad parameter", 500:"server error"}
      }),
      insertFileImagecodes: genFunction({
        path: '/images/{{id}}/insert',
        method: 'POST',
        codes: {200:true, 400:"bad parameter", 500:"server error"}
      }),
      inspectImage: genFunction({
        path: '/images/{{id}}/json',
        method: 'GET',
        codes: {200:true, 404:"no such image", 500:"server error"}
      }),
      historyImage: genFunction({
        path: '/images/{{id}}/history',
        method: 'GET',
        codes: {200:true, 404:"no such image", 500:"server error"}
      }),
      pushImage: genFunction({
        path: '/images/{{id}}/push',
        method: 'POST',
        codes: {200:true, 400:"bad parameter", 404:"no such image", 500:"server error"}
      }),
      tagImage: genFunction({
        path: '/images/{{id}}/tag',
        method: 'POST',
        codes: {200:true, 400:"bad parameter", 404:"no such image", 500:"server error"}
      }),
      removeImage: genFunction({
        path: '/images/{{id}}',
        method: 'DELETE',
        codes: {200:true, 404:"no such image", 500:"server error"}
      }),
      searchImages: genFunction({
        path: '/images/search',
        method: 'GET',
        codes: {200:true, 500:"server error"}
      }),
      // MISC
      build: genFunction({
        path: '/build',
        method: 'POST',
        codes: {200:true, 500:"server error"}
      }),
      getAuth: genFunction({
        path: '/auth',
        method: 'GET',
        codes: {200:true, 500:"server error"}
      }),
      setAuth: genFunction({
        path: '/auth',
        method: 'POST',
        codes: {200:true, 204:true, 500:"server error"}
      }),
      systemInfo: genFunction({
        path: '/info',
        method: 'GET',
        codes: {200:true, 500:"server error"}
      }),
      version: genFunction({
        path: '/version',
        method: 'GET',
        codes: {200:true, 500:"server error"}
      }),
      commit: genFunction({
        path: '/commit',
        method: 'POST',
        codes: {201:true, 404:"no such container", 500:"server error"}
      })
    };
  })(host);

}
