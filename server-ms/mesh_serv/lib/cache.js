'use strict'

// load related modules
module.exports = function (options) {
  let seneca = this

  let name = 'cache-serv'

  seneca.add('cache: store, cmd: cacheCorpApi', cacheCorpApi)

  function cacheCorpApi (msg, response) {
    console.log('Entering cacheCorpApi...');

    console.log('msg.result: ', JSON.stringify(msg.result));
    return response(null, {ok: true, msg: result});

    console.log('Leaving cacheCorpApi...');
  }
 

  return {
    name: name
  }
}