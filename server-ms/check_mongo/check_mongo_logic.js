'use strict'

const _ = require('lodash');
//const Jsonic = require('jsonic');
const Mongoose = require('mongoose');

module.exports = function check_mongo (options) {
  var seneca = this

  function isMongoAvailable (msg, response) {

    console.log('Entering GET /isMongoAvailable...');

    var dbName = process.env.MONGO_DB || 'corp_rolo';
    var dbHost = process.env.HOST;
    var dbPort = process.env.MONGO_PORT || 27017;
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

    console.log('Leaving GET /isMongoAvailable...');
  }

  seneca.add('store:check,cmd:exist', isMongoAvailable)
}