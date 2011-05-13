var fs = require('fs'),
    path = require('path'),
    sys = require('sys'),
    watch = require('watch'),
    helpers = require('./helpers');


/**
* Loader - loads all js files from a directory root,
* compiles them and puts them into objects variable
*/
var loader = module.exports = function(dir, context, callback) {
  if (!helpers.isDirectory(dir)) return;
  
  // Add trailing slash
  dir = dir.replace(/\/+$/, '') + '/';
  
  // Context must be defined
  context = context || {};
  
  var objects = {},
      weighted = [],
      args = Array.prototype.slice.call(arguments, 1);
      
  addInvokeMethods(context, weighted);
  
  watch.walk(dir, function(err, files_obj) {  
    if (err) {
      console.log(err);
      return;
    }
    
    var files = [];
    
    for (var file in files_obj) {
      if (!files_obj.hasOwnProperty(file)) continue;
      
      files.push(file);
    }
    
    // Replace kind of wildcard '?' with objects itself,
    // So objects can be passed to context on demand
    for (var i in context) if (context[i] === '?') context[i] = objects;
    
    files.reduce(helpers.reduce(dir), []).forEach(function(file) {
      var result = helpers.require(file, context);
      
      // If module is disabled - do not load it
      if (!result.exports || result.exports.enabled === false) return;
      
      // Add to modules object
      var object = result.exports;
            
      // module.folder will points to object in "modules" global variable
      // which holds this module      
      // 
      // so if we have module with path: /my_app/some_module/abc.js
      // module.folder will be equal to modules.my_app.some_module
      // inside this module's context
      result.folder = helpers.store(objects, file.name, object);
      
      // Add to weighted collection
      weighted.push({
        weight: parseInt(object.weight) || 0,
        name: file.name,
        value: object
      });
    });
    
    // Sort objects in collection by weight
    weighted.sort(function(a, b) {
      return a.weight > b.weight;
    });
    
    // All objects are in place
    // Invoke init
    process.nextTick(function() {
      context.invoke('init');  
    });
    
    callback && callback(null, context.invoke.emitter);
  });
}

/**
* Adds invoke methods to execution context
*
* Provides cool syntax
* invoke('init', arg1, arg2, arg3).array
*/
function addInvokeMethods(context, weighted) {
  var len;
  
  context.invoke = function(callbackName) {    
    var args = Array.prototype.slice.call(arguments, 1);
    
    // Calculate length only once
    len = len || weighted.length;
    
    var array = [], object = {};
    
    for (var i = 0; i < len; i++) {
      var elem = weighted[i],
          callback = elem.value[callbackName];
    
      if (!elem.value.hasOwnProperty(callbackName) ||
          !helpers.isFunction(callback)) continue;
      
      try {
        var result = callback.apply(elem, args);        
        array.push(result);
        helpers.store(object, elem.name, result);
      } catch (e) {
        sys.puts(e);
      }
    }
    
    // Invoke EventEmitter (for debug purposes)
    context.invoke.emitter.emit.apply(
      context.invoke.emitter,
      arguments
    );
    
    return {
      object: object,
      array: array
    };
  };
  
  context.invoke.emitter = new process.EventEmitter;
}
