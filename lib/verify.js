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
    var msg = res.statusCode + " error: " + JSON.stringify(json);
    var error = new Error(msg);
    return cb(error, json)
  }
  cb(null, json)
}