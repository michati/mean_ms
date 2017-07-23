'use strict'

var PORT = 27017
var BASES = (process.env.BASES || process.argv[3] || '').split(',')
var HOST = '127.0.0.1'


var Mongoose = require('mongoose');
var seneca = require('seneca')({
  tag:'dbConnect',
  internal: {logger: require('seneca-demo-logger')},
  debug: {short_logs:true}
})

seneca
  .use('mesh',{
    bases: BASES,
    host: HOST
  })

    var dbName = 'reg';
    var dbHost = HOST;
    var dbPort = PORT;
    var uri = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

    seneca.log.info('URI: ' + uri + '\n');

    Mongoose.connection.on('open', function (ref) {
      console.log('Connected to Mongo server 1: ' + uri);
    });

    Mongoose.connection.on('error', function (err) {
      console.log('Could not connect to Mongo server...');
      console.log(err);
    });   

    Mongoose.connect(uri, {auto_reconnect: true, native_parser: true}, function (err) {
      if (err) {
      	console.log('Could not connect to: ' + uri)
        return err  
      }
    });
