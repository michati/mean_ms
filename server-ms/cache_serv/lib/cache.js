'use strict'

// load related modules
module.exports = function (options) {
  var seneca = this

  var name = 'cache-data-api'

  var cache = require('express-redis-cache')(options.redis);

  function cacheData (msg, response) {

    console.log('Entering POST /cacheData...');

    var cacheDat = JSON.stringify(msg.corpdata);
    var cacheKey = msg.key;
    console.log('cacheDat: ' + cacheDat);
    console.log('cacheKey: ' + cacheKey);

    cache.add(cacheKey, cacheDat, 
    { expire: 60 * 60 * 24, type: 'json' },
    function (err, added) {
      if (err) {
        return response(null, {ok: false, why: err}); 
      }
      return response(null, {ok: true, key: added ,why: 'Cache Data saved.'});
   }); 

    console.log('Leaving POST /cacheData...');

  }

  function getCacheData (msg, response) {

    console.log('Entering GET /getCacheData...');

    var cacheKey = msg.key;

    cache.get(cacheKey, function (err, entries) {
      if (err) {
        return response(null, {ok: false, why: err}); 
      }

      //console.log('Entries: ' + JSON.stringify(entries));

      if (entries.length === 0) {
        return response(null, {ok: false, why: 'No entries in redis.'}); 
      } else {
        return response(null, {ok: true, entries: entries}); 
      }
    })

    console.log('Leaving GET /getCacheData...');

  }

  function deleteCacheData (msg, response) {

    console.log('Entering DELETE /deleteCacheData...');

    var cacheKey = msg.key;

    cache.del(cacheKey, function (err) {
      if (err) {
        return response(null, {ok: false, why: err}); 
      }
      return response(null, {ok: true, entries: 'Entries deleted.'}); 
    })

    console.log('Leaving DELETE /deleteCacheData...');

  }

  function init (args, done) {
    seneca.act({
      role: 'web', use: {
        name: 'data',
        prefix: '/cache',
        pin: {cache: 'data', cmd: '*'},
        map: {
          cacheData: {POST: true, alias: 'cachedata'},
          deleteCacheData: {DELETE: true, alias: 'deletedata'},
          getCacheData: {GET: true, alias: 'getdata'}
        }
      }
    })

    seneca
      .add('cache: data, cmd: cacheData', cacheData)
      .add('cache: data, cmd: deleteCacheData', deleteCacheData)
      .add('cache: data, cmd: getCacheData', getCacheData)

    done()
  }

  seneca.add('init: ' + name, init)

  return {
    name: name
  }
}