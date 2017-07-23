'use strict'

const _ = require('lodash');

// load related modules
module.exports = function (options) {
  let seneca = this
  let name = 'get-es-corp-api'

  var esIndex = process.env.ES_INDEX;
  var esType = process.env.ES_TYPE;

  var esApiClient = options.elasticsearchClient.es;

  function getAllEsCorp (msg, response) {

    console.log('Entering ES GET /getAllEsCorp...');

    esApiClient.search({
      index: esIndex,
      type: esType
    }).then(function (body) {
      var hits = body.hits.hits;
      //console.log('ES index: ' + JSON.stringify(hits));
      return response(null, {ok: true, index: hits});

    }, function (err) {
      if (err) {
        return response(null, {ok: false, why: err});
      }

    });

    console.log('Leaving ES GET /getAllEsCorp...');

  }

  function getCountAllEsCorp (msg, response) {

    console.log('Entering ES GET /getCountAllEsCorp...');

    esApiClient.count({
      index: esIndex,
      type: esType
    }).then(function (res) {
      return response(null, {ok: true, count: res.count.count});
    }, function (err) {
      if (err) {
        return response(null, {ok: false, why: err});
      }

    });

    console.log('Leaving ES GET /getCountAllEsCorp...');

  }

  function deleteEsCorpDoc (msg, response) {

    console.log('Entering ES DELETE /deleteEsCorpDoc...');

    var delId = msg.req$.params.docid;
    console.log('deleteEsCorpDoc::delId: ' + delId);

    esApiClient.delete({
      index: esIndex,
      id: delId,
      type: esType
    }).then(function (res) {
      return response(null, {ok: true, deleted: res});
    }, function (err) {
      if (err) {
        return response(null, {ok: false, why: err});
      }

    });

    console.log('Leaving ES DELETE /deleteEsCorpDoc...');

  }

  function searchByFieldAndText (msg, response) {

    console.log('Entering ES GET /searchByFieldAndText...');

    var searchField = msg.req$.params.sfield;
    var searchText = msg.req$.query.stext;
    //var obj = '"' + searchField + '": "' + searchText + '"';  
    //var jobj = JSON.stringify({searchField : searchText}); 
    console.log('searchByFieldAndText::searchField: ' + searchField);
    console.log('searchByFieldAndText::searchText: ' + searchText);
    //console.log('searchByFieldAndText::obj: ' + jobj);
    esApiClient.search({
      index: esIndex,
        body: {
          query: {
            bool: {
              must: {
                match: {
                  _all: searchText
                }
              }
            }
          }
        }
    }).then(function (res) {
      var hits = res.hits.hits;
      return response(null, {ok: true, result: hits});
    }, function (err) {
      if (err) {
        return response(null, {ok: false, why: err});
      }

    });

    console.log('Leaving ES GET /searchByFieldAndText...');

  }

  function getCompId (msg, response) {

    //var compNameText = msg.req$.query.nameText;
    var compNameText = msg.company;
    console.log('compNameText: ' + compNameText);
    var allCompNames = [];
    esApiClient.search({
      index: esIndex,
      type: esType,
      "body": {
        "query": {
          "bool": {
            "must": {
              "query_string": {
                "fields": ["company.name"],
                "query": compNameText
              }
            }
          }
        }
      }
    }).then(function (res) {
      console.log('RES: ', JSON.stringify(res))
      res.hits.hits.forEach(function (hit) {
        console.log('\n\n-------> hit._id: ' + JSON.stringify(hit._id));
        allCompNames.push(hit._id)        
      })
      console.log('allCompNames.length: ' + allCompNames.length);
      if (allCompNames.length === 1) {
        return response(null, {ok: true, id: allCompNames[0]});
      }
      if (allCompNames.length === 0) {
        return response(null, {ok: false, why: 'No company matches that name'});
      }
      if (allCompNames.length > 1) {
        return response(null, {ok: false, why: 'More than one company matches that name'});
      }
    }, function (err) {
      if (err) {
        return response(null, {ok: false, why: err});
      }
    })
  }

  function init (args, done) {
    seneca.act({
      role: 'web', use: {
        name: 'elastic',
        prefix: '/es/corp',
        pin: {role: 'elastic', cmd: '*'},
        map: {
          getAllEsCorp: {GET: true, alias: '/getallcorp'},
          getCountAllEsCorp: {GET: true, alias: '/getcount'},
          deleteEsCorpDoc: {DELETE: true, alias: '/deldoc/:docid'},
          searchByFieldAndText: {GET: true, alias: '/search/:sfield/text'},
          getCompId: {GET: true, alias: '/search/compid/'}
        }
      }
    })
    seneca
      .add('role: elastic, cmd: getAllEsCorp', getAllEsCorp)
      .add('role: elastic, cmd: getCountAllEsCorp', getCountAllEsCorp)
      .add('role: elastic, cmd: deleteEsCorpDoc', deleteEsCorpDoc)
      .add('role: elastic, cmd: searchByFieldAndText', searchByFieldAndText)
      .add('role: elastic, cmd: getCompId', getCompId)

    done()
  }

  seneca.add('init: ' + name, init)

  return {
    name: name
  }
}