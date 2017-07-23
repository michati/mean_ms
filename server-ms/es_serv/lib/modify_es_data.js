'use strict'

const _ = require('lodash');

// load related modules
module.exports = function (options) {
  let seneca = this
  let name = 'modify-es-corp-api'

  var esIndex = process.env.ES_INDEX;
  var esType = process.env.ES_TYPE;

  var esModClient = options.elasticsearchClient.es;

  function addAnotherOfficer (msg, response) {

    var companyName = msg.req$.query.compName;
    var newPhoneText = msg.req$.query.phoneText;
    var newNameText = msg.req$.query.nameText;

    seneca.act('role: elastic, cmd: getCompId', {company: companyName}, 
      function (err, res) {
        if (err) {
          return response(null, {ok: false, why: err});
        }
        var companyId = res.id;

        console.log('addAnotherOfficer::companyId: ' + companyId);
        console.log('addAnotherOfficer::newPhoneText: ' + newPhoneText);
        console.log('addAnotherOfficer::newNameText: ' + newNameText);

        esModClient.update({
          index: esIndex,
          type: esType,
          id: companyId,
          "body": {
            "script": {
              "inline": "ctx._source.officer.add(itemToAdd)",
              "params": {
                "itemToAdd": {
                  "name": newNameText, 
                  "phone": newPhoneText
                }
              }
            }
          }
        }).then(function (res) {
          return response(null, {ok: true, why: res});  
        }, function (err) {
          if (err) {
            return response(null, {ok: false, why: err});
          }
        })
      })
  }

  function removeAnOfficer (msg, response) {

    var companyName = msg.req$.query.compName;
    var newPhoneText = msg.req$.query.phoneText;
    var newNameText = msg.req$.query.nameText;

    seneca.act('role: elastic, cmd: getCompId', {company: companyName}, 
      function (err, res) {
        if (err) {
          return response(null, {ok: false, why: err});
        }
        var companyId = res.id;

        console.log('addAnotherOfficer::companyId: ' + companyId);
        //console.log('addAnotherOfficer::newPhoneText: ' + newPhoneText);
        console.log('addAnotherOfficer::newNameText: ' + newNameText);

        esModClient.update({
          index: esIndex,
          type: esType,
          id: companyId,
          "body": {
              "doc": {
            "script": {
              "file": "removeFromArray",
              "params": {
                "name": newNameText
              }
            }
        }
          }
        }).then(function (res) {
          return response(null, {ok: true, why: res});  
        }, function (err) {
          if (err) {
            return response(null, {ok: false, why: err});
          }
        })
      })
  }

  function init (args, done) {
    seneca.act({
      role: 'web', use: {
        name: 'elastic',
        prefix: '/es/corp/modify',
        pin: {role: 'elastic', cmd: '*'},
        map: {
          addAnotherOfficer: {POST: true, alias: '/addoff/'},
          removeAnOfficer: {DELETE: true, alias: '/removeoff/'}
        }
      }
    })
    seneca
      .add('role: elastic, cmd: addAnotherOfficer', addAnotherOfficer)
      .add('role: elastic, cmd: removeAnOfficer', removeAnOfficer)

    done()
  }

  seneca.add('init: ' + name, init)

  return {
    name: name
  }
}