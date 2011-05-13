var fs = require('fs'),
    path = require('path'),
    Script = process.binding('evals').Script;

/**
* Check, whether dir is directory or not
*/
var isDirectory = exports.isDirectory = function(dir) {
  var stat;
  return path.existsSync(dir) && (stat = fs.statSync(dir)) &&
         stat.isDirectory();
}

/**
* is obj function?
*/
exports.isFunction = function(obj) {
  return typeof obj === 'function';
}

/**
* Copy own properties of b to a
*/
exports.extend = function(a, b) {
  if (!b) return a;
  
  for (var i in b) {
    if (b.hasOwnProperty(i)) a[i] = b[i];
  }
  
  return a;
};

/**
* This function will be used to process files array
*/
exports.reduce = function(dir) {
  dir = path.normalize(dir);
  
  return function(accum, elem) {
    var filepath = elem.substr(dir.length);
    
    if (!filepath) return accum;
    
    // Process only files
    if (!isDirectory(elem)) {    
      accum.push({
        extension: path.extname(filepath),
        name: filepath.replace(/\.[^\.]+$/, ''),
        filepath: elem
      });
    }
    
    return accum;
  }
};

/**
* Compile script in a new context
* Very common to nodejs module system
*/
exports.require = function(file, context) {
  var content = fs.readFileSync(file.filepath);
  
  if (file.extension !== '.js') {
    return {exports: content};
  }
  try {
    var fn = Script.runInNewContext('(function(require, __dirname, ' +
                                    '__filename, module, exports) {\n' +
                                    content +
                                    '\n;})', context, file.filepath),
        exports = {},
        module = {exports: exports},
        dirname = path.dirname(file.filepath);
    
    fn(require, dirname, file.filepath, module, exports);
  } catch (e) {
    console.log('Failed to load: ' + file.filepath, e);
    return {};
  }
  return module;
};

/**
* Helps storing modules in javascript object
* a.b.c  = x => {a:{b:{c: x}}}
*/
exports.store = function(storage, key, val) {
  var previous;  
  key.split(/\.|\//g).forEach(function(subkey) {
    subkey = subkey.trim();
    
    previous = {
      storage: storage,
      subkey: subkey
    };
    storage = storage[subkey] || (storage[subkey] = {});
  }); 

  if (!previous) return;
  previous.storage[previous.subkey] = val;
  
  return previous.storage;
};

