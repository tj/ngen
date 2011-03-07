
/**
 * Module dependencies.
 */

var {{project}} = require('{{project}}')
  , should = require('should');

module.exports = {
  'test .version': function(){
    {{project}}.version.should.match(/^\d+\.\d+\.\d+$/);
  }
};