'use strict'

const _ = require('lodash');
//const Jsonic = require('jsonic');
const Mongoose = require('mongoose');
const ClientData = require('./client_db');

module.exports = function (options) {
  let seneca = this

  let name = 'seed-transport-data-api'

  function checkTransClientCollection (msg, response) {

    console.log('Entering GET /checkTransClientCollection...');
    
    ClientData.count({}, function (err, clientCount) {
      if (err) {
        console.log('Error: ' + err);
        return response(null, {ok: false, why: err});
      }

      if (clientCount < 1) {
        return response(null, {ok: false, count: clientCount}); 
      } else {
        return response(null, {ok: true, count: clientCount});
      }
    });
    console.log('Leaving GET /checkTransClientCollection...');

  }

  function seedTransClientCollection (msg, response) {

    console.log('Entering GET /seedTransClientCollection...');

    console.log('options.transClient: ' + JSON.stringify(options.transClient));

    var cd = options.transClient;
    var newClientData = new ClientData(cd);

    newClientData.save(function (err, result) {
      if (err) {
        console.error('Failed to create a new record');
        return response(null, {ok: false, why: err});
      }
      return response(null, {ok: true, result: result});
    }); 

    console.log('Leaving GET /seedTransClientCollection...');

  }


  function init (args, done) {
    seneca.act({
      role: 'web', use: {
        name: 'rolo',
        prefix: '/transport',
        pin: {role: 'rolo', cmd: '*'},
        map: {
          seedTransClientCollection: {GET: true, alias: 'seedclient'},
          checkTransClientCollection: {GET: true, alias: 'clientcount'}
        }
      }
    })
    seneca
      .add('role: rolo, cmd: seedTransClientCollection', seedTransClientCollection)
      .add('role: rolo, cmd: checkTransClientCollection', checkTransClientCollection)

    done()
  }

  seneca.add('init: ' + name, init)

  return {
    name: name
  }
}
