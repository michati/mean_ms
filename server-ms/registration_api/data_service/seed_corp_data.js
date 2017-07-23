'use strict'

const _ = require('lodash');
//const Jsonic = require('jsonic');
const Mongoose = require('mongoose');
const CorpData = require('./corp_db');

module.exports = function (options) {
  let seneca = this

  let name = 'seed-corp-data-api'

  function checkRoloCorpCollection (msg, response) {

    console.log('Entering GET /checkRoloCorpCollection...');
    
    CorpData.count({}, function (err, corpCount) {
      if (err) {
        console.log('Error: ' + err);
        return response(null, {ok: false, why: err});
      }

      if (corpCount < 1) {
        return response(null, {ok: false, count: corpCount}); 
      } else {
        return response(null, {ok: true, count: corpCount});
      }
    });
    console.log('Leaving GET /checkRoloCorpCollection...');

  }

  function seedRoloCorpCollection (msg, response) {

    console.log('Entering GET /seedRoloCorpCollection...');

    console.log('options.seedRoloCorp: ' + JSON.stringify(options.seedRoloCorp));

    var rc = options.seedRoloCorp;
    var newCorpData = CorpData(rc);

    newCorpData.save(function (err, result) {
      if (err) {
        console.error('Failed to create a new record');
        return response(null, {ok: false, why: err});
      }
      return response(null, {ok: true, result: result});
    });  

    console.log('Leaving GET /seedRoloCorpCollection...');

  }


  function init (args, done) {
    seneca.act({
      role: 'web', use: {
        name: 'rolo',
        prefix: '/corp',
        pin: {role: 'rolo', cmd: '*'},
        map: {
          seedRoloCorpCollection: {GET: true, alias: 'seedcorp'},
          checkRoloCorpCollection: {GET: true, alias: 'corpcount'}
        }
      }
    })
    seneca
      .add('role: rolo, cmd: seedRoloCorpCollection', seedRoloCorpCollection)
      .add('role: rolo, cmd: checkRoloCorpCollection', checkRoloCorpCollection)

    done()
  }

  seneca.add('init: ' + name, init)

  return {
    name: name
  }
}
