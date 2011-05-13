var fs = require('fs'),
    watch = require('watch'),
    connect = require('connect'),
    argv = require('optimist').argv;

var config = JSON.parse(fs.readFileSync(argv.config || './config.json')),
    db = require('./config/db'),
    loader = require('./lib/loader');

function init(db) {
  loader(__dirname + '/modules', {
          rootdir: __dirname,
          console: console,
          process: process,
          config: config,
          setTimeout: setTimeout,
          setInterval: setInterval,
          clearTimeout: clearTimeout,
          clearIntevral: clearInterval,
          db: db,
          modules: '?'
        });
}

db(config, init);

