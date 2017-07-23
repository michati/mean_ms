'use strict'

const CorpData = require('../data_service/corp_db');

// load related modules
module.exports = function (options) {
  let seneca = this

  let name = 'get-corp-api'

  function getAllCorp (msg, response) {

    console.log('Entering GET /getAllCorp...');

    seneca.act('cache: data, cmd: getCacheData',
      {key: name}, function (err, msg) {
        if (err) {
          return response(null, {ok: false, why: err});
        }
        if (msg.ok === true) {
          return response(null, {ok: true, redis: msg.entries});
        } else {
          CorpData.find({}, function (err, result) {
            if (err) {
              return response(null, {ok: false, why: err});
            }
            addDataToCache(result);
            return response(null, {ok: true, mongo: result});
          });
        }
      })

    //seneca.act('role: tok, cmd: newToken', function (err, msg) {
    //  console.log('Token: ' + JSON.stringify(msg));  
    //})
    
    console.log('Leaving GET /getAllCorp...');

  }

  function delRedisData (msg, response) {

    console.log('Entering GET /delRedisData...');

    seneca.act('cache: data, cmd: deleteCacheData',
      {key: name}, function (err, msg) {
        if (err) {
          return response(null, {ok: false, why: err});
        }
      return response(null, {ok: true, redis: msg});
    })
    
    console.log('Leaving GET //delRedisData...');

  }

  function addDataToCache (corpData) {

    console.log('Entering GET /checkCache...');
    seneca.act('cache: data, cmd: cacheData', 
      {
        corpdata: corpData,
        key: name
      },
      function (err, msg, response) {
      if (err) {
        return response(null, {ok: false, why: err});
      }
      console.log('msg: ' + JSON.stringify(msg));
    })   
    console.log('Leaving GET /checkCache...');

  }

  function blah () {
    console.log('\n...CHECKING AUTH...\n');
  }

  function init (args, done) {
    seneca.act({
      role: 'web', use: {
        name: 'rolo',
        prefix: '/rolocorp',
        pin: {role: 'rolo', cmd: '*'},
        map: {
          getAllCorp: {GET: true, auth: blah, alias: 'getcorp'},
          delRedisData: {GET: true, alias: 'delredis'}
        }
      }
    })
    seneca
      .add('role: rolo, cmd: getAllCorp', getAllCorp)
      .add('role: rolo, cmd: delRedisData', delRedisData)

    done()
  }

  seneca.add('init: ' + name, init)

  return {
    name: name
  }
}