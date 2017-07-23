'use strict'

const _ = require('lodash')
const Jsonic = require('jsonic')

module.exports = function (opts) {
  var seneca = this

  var options = {
    name: 'client-api'
  }

  function upsertClient (msg, response) {
    let clientData = msg.data
    let context = this

    // @hack - until UI is fixed for this
    prepareClientForDB(clientData)

    // @hack - just for now until make sure all requests have an appkey
    if (clientData.id) {
      context.make$(clientDataEntity, clientData).save$(function (err, client) {
        if (err) {
          return response(null, {ok: false, why: err})
        }
        return response(null, {ok: true, data: client.data$(false)})
      })
    }
    else {
      context.make$(clientDataEntity).load$({appkey: clientData.appkey}, function (err, client) {
        if (err) {
          return response(null, {ok: false, why: err})
        }
        if (client) {
          return response(null, {ok: false, why: 'Client with same appkey already exists'})
        }
        context.make$(clientDataEntity, clientData).save$(function (err, client) {
          if (err) {
            return response(null, {ok: false, why: err})
          }
          return response(null, {ok: true, data: prepareClientForUI(client.data$(false))})
        })
      })
    }
  }


  function init (args, done) {
    seneca.act({
      role: 'web', use: {
        name: 'concorda',
        prefix: '/api/v1/admin',
        pin: {role: 'concorda', cmd: '*'},
        map: {
          listClients: {GET: true, auth: 'session', alias: 'client'},
          loadClient: {GET: true, auth: 'session', alias: 'client/:clientId'},
          listClientsAlias: {GET: true, auth: 'session', alias: 'clients'},
          createClient: {POST: true, PUT: true, auth: 'session', data: true, alias: 'client'},
          deleteClient: {DELETE: true, auth: 'session', alias: 'client/:clientId'},
          setUserClients: {POST: true, PUT: true, auth: 'session', alias: 'user/:userId/clients'}
        }
      }  
    })

    done()
  }

  seneca.add('init: ' + options.name, init)

  return {
    name: options.name
  }
}