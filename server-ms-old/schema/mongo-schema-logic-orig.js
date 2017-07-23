'use strict'

const _ = require('lodash');
//const Jsonic = require('jsonic');
const Mongoose = require('mongoose');

module.exports = function (options) {
  let seneca = this

  let name = 'connect-database-api'

  function connectToDb (msg, response) {

    console.log('Entering GET /connectToDb...');

    var dbName = options.db.dbname;
    var dbHost = options.db.dbhost;
    var dbPort = options.db.dbport;
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

  function init (args, done) {
    seneca.act({
      role: 'web', use: {
        name: 'mongo-schema',
        prefix: '/db',
        pin: {store: 'schema', cmd: '*'},
        map: {
          connectToDb: {GET: true, alias: 'dbconnect'}
        }
      }
    })
    seneca
      .add('role: rolo, cmd: connectToDb', connectToDb)

    done()
  }

  seneca.add('init: ' + name, init)

  return {
    name: name
  }
}