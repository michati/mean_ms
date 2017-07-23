'use strict'

// external plugins
//const Auth = require('./auth');
const Mesh = require('seneca-mesh');
const _ = require('lodash');

const DbConnect = require('../data_service/db_connect');
//const SeedTransData = require('../data_service/seed_trans_data');
//const SeedCorpData = require('../data_service/seed_corp_data');
//const GetCorpData = require('./get_corp_serv');
//const SetUp = require('./setup');

module.exports = function (opts) {
  let name = 'user_registration_api'
  let seneca = this

  const defaultOptions = {
    mesh: {
      bases: process.env.BASES,
      host: process.env.HOST
    },
    transport: {
      active: process.env.USE_TRANSPORT || true,
      type: process.env.TRANSPORT_TYPE || 'tcp',
      listen: [{
        port: process.env.TRANSPORT_PORT || 4001,
        host: process.env.TRANSPORT_HOST
      }]
    }
  }

  const options = _.extend(
    {},
    defaultOptions,
    opts
  )

  seneca.log.info('Using configuration: ', JSON.stringify(options))

  function run () {
  	seneca.log.debug('Loading Dependencies');
    loadDependencies();
  }

  function loadDependencies () {

    //seneca.log.info('Configure Transport');

    //configureTransport();

    seneca.ready(function () {
      // register services endpoints only after all seneca actions are registered
      registerEndpoints();
      seneca.ready(function () {
        seneca
          //.use(SetUp, options)
          .use(Mesh, options.mesh);
      })  
    })

    function registerEndpoints () {
      seneca
        .use(DbConnect, options)
        //.use(SeedCorpData, options)
        //.use(SeedTransData, options)
        //.use(GetCorpData, options)
    }

    // Load configured transport
    /*function configureTransport () {

      // load transport if active
      if (options.transport.active === true || options.transport.active === 'true') {
        // load a server
        seneca.log.info(`Register as transport server for: ${JSON.stringify(options.transport)}`)
        seneca.listen(options.transport)
        
        // load a client
        seneca.log.info(`Register as transport client for: ${JSON.stringify(options.transport)}`)
        seneca.client(options.transport)
      }
    }*/
  }
  run();

  return {
    name: name
  }

 }