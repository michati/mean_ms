'use strict'

const Mesh = require('seneca-mesh');
const _ = require('lodash');

const CacheData = require('./cache');

module.exports = function (opts) {
  let name = 'rolomesh'
  let seneca = this
  //let useLocalCore = true

  const defaultOptions = {
    mesh: {
      auto: true,
      listen: [
        {pin: 'role:tok'},
        {pin: 'role:store'}
    ]
    }
  }

  const options = _.extend(
    {},
    defaultOptions,
    opts
  )

  seneca.log.info('Using configuration (cmmicro): ', JSON.stringify(options))

  function run () {
  	seneca.log.debug('Loading Dependencies');

    loadDependencies();
   // seneca.use(Mesh, options.mesh)

  }

  function loadDependencies () {

    function registerEndpoints () {
      seneca
        .use(CacheData, options)
    }
  }  

  /*function loadDependencies () {

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
  }*/

  run();

  return {
    name: name
  }

 }