'use strict'

var PORT = 27017
var BASES = (process.env.BASES || process.argv[2] || '').split(',')
var HOST = '127.0.0.1'


var mongoose = require('mongoose');
var seneca = require('seneca')({
  tag:'dbConnect',
  internal: {logger: require('seneca-demo-logger')},
  debug: {short_logs:true}
})

/*seneca
  .use('mesh',{
    bases: BASES,
    host: HOST
  })*/

    var dbName = 'reg';
    var dbHost = HOST;
    var dbPort = PORT;
    var uri = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

    seneca.log.info('URI: ' + uri + '\n');   

    mongoose.connect('mongodb://127.0.0.1/reg', function (err) {
      if (err) {
      	console.log('Could not connect to: ' + uri)
        return err  
      }
      console.log('Connected to Mongo server 1: ' + uri)
    });