'use strict'

const _ = require('lodash');
const cas = require('casual');

module.exports = function (options) {
  let seneca = this
  let name = 'init-es-corp-data-api'

  var esIndex = process.env.ES_INDEX;
  var esType = process.env.ES_TYPE;

  var esSetupClient = options.elasticsearchClient.es;

  function checkEsConnection (msg, response) {

    console.log('Entering GET /checkEs...');

    esSetupClient.ping({requestTimeout: Infinity, hello: "elasticsearch!"}, 
      function (err) {
      if (err) {
        console.trace('elasticsearch cluster is down!');
        return response(null, {ok: false, why: 'Cound not connect to ES'});
      } else {
        console.log('All is well');
        return response(null, {ok: true, why: 'Connected to ES'});
      }
    });

    console.log('Entering GET /checkEs...');

  }

  function seedEsCorpIndex (msg, response) {

    console.log('Entering POST /seedEsCorpIndex...');

    esSetupClient.create({
      "index": process.env.ES_INDEX,
      "type": process.env.ES_TYPE,
      "body": {
        "company": {
          "name": cas.company_name,
          "email": cas.email,
          "state": cas.state,
          "country": cas.country,
          "address": cas.address,
          "location": {
            "lat": cas.latitude,
            "lon": cas.longitude
          }
        },
        "poc": [{
          "name": cas.full_name,
          "phone": cas.phone
        }],
        "officer": [{
          "name": cas.full_name,
          "phone": cas.phone
        }]
      }
    }).then(function (res) {
      return response(null, {ok: true, deleted: res});

    }, function (err) {
      if (err) {
        return response(null, {ok: false, why: err});
      }

    });
    console.log('Leaving POST /seedEsCorpIndex...');

  }


  function deleteEsCorpIndex (msg, response) {

    console.log('Entering DELETE /deleteEsCorpIndex...');

    esSetupClient.indices.delete({
      index: esIndex
    }).then(function (res) {
      return response(null, {ok: true, deleted: res});

    }, function (err) {
      if (err) {
        return response(null, {ok: false, why: err});
      }

    });
    
    console.log('Leaving DELETE /deleteEsCorpIndex...');

  }

  function createEsCorpIndex (msg, response) {

    console.log('Entering GET /createEsCorpIndex...');

    esSetupClient.indices.create({
      index: esIndex
    }).then(function (res) {
      return response(null, {ok: true, created: res});

    }, function (err) {
      if (err) {
        return response(null, {ok: false, why: err});
      }

    });
    
    console.log('Leaving GET /createEsCorpIndex...');

  }

  function createEsCorpTemplate (msg, response) {

    console.log('Entering GET /createEsCorpTemplate...');

    esSetupClient.indices.putTemplate(
      options.template
    ).then(function (res) {
      return response(null, {ok: true, template: res});
    }, function (err) {
      if (err) {
        return response(null, {ok: false, why: err});
      }
    });
    
    console.log('Leaving GET /createEsCorpTemplate...');

  }

  function getEsCorpTemplate (msg, response) {

    console.log('Entering GET /getEsCorpTemplate...');

    esSetupClient.indices.getTemplate()
    .then(function (res) {
      return response(null, {ok: true, template: res});
    }, function (err) {
      if (err) {
        return response(null, {ok: false, why: err});
      }
    });
    
    console.log('Leaving GET /getEsCorpTemplate...');

  }

  function doesEsCorpIndexExist (msg, response) {

    console.log('Entering GET /doesEsCorpIndexExist...');

    esSetupClient.indices.exists({
      index: esIndex
    }).then(function (res) {
      return response(null, {ok: true, exists: res});

    }, function (err) {
      if (err) {
        return response(null, {ok: false, why: err});
      }

    });
    
    console.log('Leaving GET /doesEsCorpIndexExist...');

  }

  function init (args, done) {
    seneca.act({
      role: 'web', use: {
        name: 'elastic',
        prefix: '/es/init',
        pin: {role: 'elastic', cmd: '*'},
        map: {
          checkEsConnection: {GET: true, alias: 'checkesconn'},
          seedEsCorpIndex: {GET: true, alias: 'seedcorpindex'},
          deleteEsCorpIndex: {GET: true, alias: 'delcorpindex'}, 
          createEsCorpIndex: {GET: true, alias: 'createcorpindex'},
          doesEsCorpIndexExist: {GET: true, alias: 'exist'},
          createEsCorpTemplate: {GET: true, alias: 'createtemplate'},
          getEsCorpTemplate: {GET: true, alias: 'gettemplate'}
        }
      }
    })
    seneca
      .add('role: elastic, cmd: checkEsConnection', checkEsConnection)
      .add('role: elastic, cmd: seedEsCorpIndex', seedEsCorpIndex)
      .add('role: elastic, cmd: deleteEsCorpIndex', deleteEsCorpIndex)
      .add('role: elastic, cmd: createEsCorpIndex', createEsCorpIndex)
      .add('role: elastic, cmd: doesEsCorpIndexExist', doesEsCorpIndexExist)
      .add('role: elastic, cmd: createEsCorpTemplate', createEsCorpTemplate)
      .add('role: elastic, cmd: getEsCorpTemplate', getEsCorpTemplate)

    done()
  }

  seneca.add('init: ' + name, init)

  return {
    name: name
  }
}
