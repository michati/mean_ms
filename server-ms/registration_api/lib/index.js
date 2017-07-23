'use strict'

const Mesh = require('seneca-mesh');
const _ = require('lodash');

const DbConnect = require('../data_service/db_connect');

module.exports = function (opts) {
  let name = 'user_registration_api'
  let seneca = this

  const defaultOptions = {
    mesh: {
      bases: process.env.BASES,
      host: process.env.HOST
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

    seneca.ready(function () {
      // register services endpoints only after all seneca actions are registered
      registerEndpoints();
      seneca.ready(function () {
        seneca.use(Mesh, options.mesh);
      })  
    })

    function registerEndpoints () {
      seneca.use(DbConnect, options)
    }
  }
  run();

  return {
    name: name
  }

 }