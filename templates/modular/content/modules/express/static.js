/**
* Express.js : Static provider
*
* Servers static content
*/

/**
* Export static content middleware
*/
exports.middleware = function(express) {
  return express.static(rootdir + '/static/');
}

exports.weight = 6;
