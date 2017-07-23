'use strict'

// external plugins
//const Auth = require('./auth');
const Mesh = require('seneca-mesh');
const _ = require('lodash');

const RoloToken = require('./token');

module.exports = function (opts) {
  let name = 'rolotoken'
  let seneca = this
  //let useLocalCore = true

  const defaultOptions = {
    mesh: {
      auto: true,
      listen: [
        {pin: 'role: tok'}
      ]
    },
    transport: {
      active: process.env.USE_TRANSPORT || true,
      type: process.env.TRANSPORT_TYPE || 'tcp',
      listen: [{
        port: process.env.TRANSPORT_PORT,
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

    seneca.log.info('Configure Transport');

    configureTransport();

    seneca.ready(function () {
      // register services endpoints only after all seneca actions are registered
      registerEndpoints();
      seneca.ready(function () {
        seneca
          .use(Mesh, options.mesh);
      })
    })

   function registerEndpoints () {
      seneca
        .use(RoloToken, options)
    }

    // Load configured transport
    function configureTransport () {

      // load transport if active
      if (options.transport.active === true || options.transport.active === 'true') {
        // load a server
        //seneca.log.info(`Register as transport server for: ${JSON.stringify(options.transport)}`)
        //seneca
        //  .listen(options.transport)
        
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