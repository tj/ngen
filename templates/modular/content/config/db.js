// This file will create database connection
// And call "fn" when connection is ready
module.exports = function(config, fn) {
  var cradle = require('cradle'),
      db = new (cradle.Connection)({
        host: config.db.host || 'localhost',
        port: config.db.port || 5984,
        auth: config.db.auth
      }).database(config.db.name);
  
  fn(db);
};
