'use strict'
var TAG = process.env.TAG || process.argv[2] || 'registration_api'
//var PORT = process.env.PORT || process.argv[3] || 39999
var BASES = (process.env.BASES || process.argv[3] || '').split(',')
var SILENT = true
//var DbLogic = require('./db_logic');
var Routes = require('./api_routes');

const _ = require('lodash');
var Mesh = require('seneca-mesh');
var Express = require('express');
var bodyParser = require('body-parser');
var Web = require('seneca-web');
var Seneca = require('seneca');
var SILENT = true;

module.exports = function (opts) {

  const defaultOptions = {
    mesh: {
      bases: process.env.BASES,
      host: process.env.HOST
    },
    web: {
      routes: Routes,
      adapter: require('seneca-web-adapter-express'),
      context: Express()
    }  
  }
  const options = _.extend(
    {},
    defaultOptions,
    opts
  )
  //console.log('Transport options: ', options);

  var seneca = Seneca({
    tag: process.env.TAG,
    //internal: {logger: require('seneca-demo-logger')},
    debug: {short_logs:true}
  })
    .use('api_logic')
    .use(Mesh,{
      bases: BASES,
      host: '127.0.0.1',
      sneeze:{
        silent: JSON.parse(SILENT),
      swim: {interval: 1111}
      }
    })
    .use(Web, options.web)
    .ready(() => {
      var server = seneca.export('web/context')()

      var port = opts.server.port;
      var host = opts.server.host;  
      server.listen(port, host, function() {
        console.log('Express server listening on port: ' + port);
      });
    })
}