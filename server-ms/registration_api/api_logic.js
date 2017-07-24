'use strict'

module.exports = function api (options) {
  var seneca = this

  function doesDbExist (msg, response) {

    seneca.act('store:check,cmd:exist', function(err,result) {
      if (err) {
        return response(null, {ok: false, why: err})
      }
      return response(null, {ok: true, result: result})
    })

  }

  function getAllRegisteredUsers (msg, response) {

    seneca.act('store:seed,cmd:getmodel', function(err,result) {
      if (err) {
        return response(null, {ok: false, why: err})
      }
      var Model = result.db
      Model.find({}, function(err, list) {
        if (err) {
          return response(null, {ok: false, why: err})
        }
        return response(null, {ok: true, result: list})
      })
    })

  }

  function addSeedDataToDb (msg, response) {

    seneca.act('store:seed,cmd:populate', function(err,result) {
      if (err) {
        return response(null, {ok: false, why: err})
      }
      return response(null, {ok: true, result: result})
    })

  }
    
  seneca.add('role: store, cmd: checkDbConnection', doesDbExist)
  seneca.add('role: store, cmd: seedMongo', addSeedDataToDb)

  seneca.add('role: api, cmd: listAllUsers', getAllRegisteredUsers)

}
