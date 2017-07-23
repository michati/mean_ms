'use strict'

const Mesh = require('seneca-mesh');
const Elasticsearch = require('elasticsearch');
const _ = require('lodash');

const InitCorpData = require('../data_service/init_es_corp_data');
const GetCorpData = require('./get_es_serv');
const ModifyCorpData = require('./modify_es_data');
const SetUp = require('./setup');

module.exports = function (opts) {
  let name = 'roloes'
  let seneca = this

  var esClient = new Elasticsearch.Client({
    host: process.env.ES_HOST,
    log: process.env.ES_LOG  
  });

  const defaultOptions = {
    mesh: {
      auto: true,
      listen: [
        {pin: 'role: elastic'}
      ]
    },
    transport: {
      active: process.env.USE_TRANSPORT || true,
      type: process.env.TRANSPORT_TYPE || 'tcp',
      listen: [{
        port: process.env.TRANSPORT_PORT,
        host: process.env.TRANSPORT_HOST 
      }]
    },
    elasticsearchClient: {
      es: esClient
    }
  }

  const options = _.extend(
    {},
    defaultOptions,
    opts
  )

  //seneca.log.info('Using configuration (roloes): ', JSON.stringify(options))

  function run () {
  	seneca.log.debug('Loading Dependencies');
    loadDependencies();

  }

  function loadDependencies () {

    seneca.log.info('Configure Transport');

    configureTransport();

    seneca.ready(function () {
      registerEndpoints();
      seneca.ready(function () {
        seneca
          //.use(SetUp, options)
          .use(Mesh, options.mesh);
      })  
    })

    function registerEndpoints () {
      seneca
        .use(GetCorpData, options)
        .use(InitCorpData, options)
        .use(ModifyCorpData, options)
    }

    // Load configured transport
    function configureTransport () {

      // load transport if active
      if (options.transport.active === true || options.transport.active === 'true') {
        // load a server
        seneca.log.info(`Register as transport server for: ${JSON.stringify(options.transport)}`)
        seneca
          .listen(options.transport)
        
        // load a client
        seneca.log.info(`Register as transport client for: ${JSON.stringify(options.transport)}`)
        seneca
          .client(options.transport)
      }
    }
  }
 

  run();

  return {
    name: name
  }
}