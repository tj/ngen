
/**
 * Module dependencies.
 */

var mini = require('mini')
  , should = require('should');

module.exports = {
  'test .version': function(){
    mini.version.should.match(/^\d+\.\d+\.\d+$/);
  }
};