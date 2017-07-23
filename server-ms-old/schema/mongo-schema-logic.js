'use strict'
var Mongoose = require('mongoose');
//var regDb = require('./register-schema')

module.exports = function (options) {
  let seneca = this

  function connectToDb (msg, response) {

    console.log('Entering GET /connectToDb...');

    var dbName = 'reg';
    var dbHost = '127.0.0.1';
    var dbPort = 27017;
    var uri = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

    seneca.log.info('URI: ' + uri + '\n');

    Mongoose.connection.on('open', function (ref) {
      console.log('Connected to Mongo server: ' + uri);
    });

    Mongoose.connection.on('error', function (err) {
      console.log('Could not connect to Mongo server...');
      console.log(err);
    });   

    Mongoose.connect(uri, {auto_reconnect: true, native_parser: true}, function (err) {
      if (err) {
        return response(null, {ok: false, why: 'Cound not connect to mongo server'});  
      }
      return response(null, {ok: true, connected: 'Connected'});
    });

    console.log('Leaving GET /connectToDb...');

  }

  function seedDb (msg, response) {  

  	var regDb = require('./register-schema')
  	console.log('seedDb.regDb: ', regDb)

    return response(null, {ok: true, msg: msg});

  }

    seneca
      .add('store:schema,cmd:seedDb', seedDb)
      .add('store:schema,cmd:connectToDb', connectToDb)


}