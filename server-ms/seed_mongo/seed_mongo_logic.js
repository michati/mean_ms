'use strict'

const _ = require('lodash');
//const Jsonic = require('jsonic');
const Mongoose = require('mongoose');

module.exports = function seed_mongo (options) {
  var seneca = this

  function getDb (msg, response) {

    console.log('Entering GET /getDb...');

    var dbName = process.env.MONGO_DB || 'corp_rolo';
    var dbHost = process.env.HOST;
    var dbPort = process.env.MONGO_PORT || 27017;
    var uri = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

    seneca.log.info('URI: ' + uri + '\n'); 

    var db = Mongoose.connect(uri, {auto_reconnect: false, native_parser: false}, function (err) {
      if (err) {
        return response(null, {ok: false, why: 'Cound not connect to mongo server'});  
      }
      require('./schema')
      return response(null, {ok: true, db: db});
    });

    console.log('Leaving GET /getDb...');
  }

  function getModel (msg, response) {

    console.log('Entering GET /getModel...');

    var Model = require('./schema')
    if (Model) {
      return response(null, {model: Model})
    }

    console.log('Leaving GET /getModel...');
  }

  //seneca.add('store:seed,cmd:populate', getDb)
  seneca.add('store:seed,cmd:getmodel', getDb)
}