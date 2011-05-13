/**
* Express.js: HTTP Server
*
* Adds .middleware(express) and .routes(app) callbacks
*/

/**
* .init() callback
*/
exports.init = function() {    
  var express = require('express'),
      middleware = invoke('middleware', express).array;
                   
  middleware.unshift(express.errorHandler());
  
  var server = express.createServer.apply(express, middleware);
  
  // Decode body and cookies
  server.use(express.bodyDecoder());
  server.use(express.cookieDecoder());
  
  // Configure views
  server.set('views', rootdir + '/views');
  server.set('view engine', 'ejs');
  
  // Apply routes
  invoke('routes', server);
  
  server.listen(config.http.port, function() {    
    console.log('Server has started listening on port ' + config.http.port);
    invoke('http-listening');
  });
}

/**
* Module's weight 
*/
exports.weight = -1E6;
