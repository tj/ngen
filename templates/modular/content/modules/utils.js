/**
* Adds middleware, that adds methods:
* # json
*/

var Buffer = require('buffer').Buffer;

/**
* Exports middleware
*/
exports.middleware = function adds_json_method(express) {
  return function(req, res, next) {
    var jsonp = req.query && req.query.callback;
    
    res.json = function(data, code) {
      data = jsonp ? jsonp + '(' + JSON.stringify(data) + ')' :
                     JSON.stringify(data);
      
      var headers = {
        'Content-Type': jsonp ? 'text/javascript' : 'application/json',
        'Content-Length': Buffer.byteLength(data)
      };
      
      if (res.header('Set-Cookie')) {
        headers['Set-Cookie'] = res.header('Set-Cookie');
      }
      
      res.writeHead(code || 200, headers);
      res.end(data);
    };
    
    next();
  }
}

/**
* Try to be first
*/
exports.weight = -1E9;
