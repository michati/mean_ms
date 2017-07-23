'use strict';

var PORT = process.env.PORT || process.argv[2] || 0
var BASES = (process.env.BASES || process.argv[3] || '').split(',')
var HOST = '127.0.0.1'

const transportLogic = require('./transport-logic');

let express = require('express');
let bodyParser = require('body-parser');
let seneca = require('seneca')();
/*let seneca = require('seneca')({
  tag:'api',
  internal: {logger: require('seneca-demo-logger')},
  debug: {short_logs:true}
});*/

module.exports = function () {

  seneca.use(transportLogic)
  

  var server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false })); 
  server.use(seneca.export('web'));
  
  var port = process.env.API_PORT || 8000;
  var host = process.env.API_HOST || '127.0.0.1';  
  server.listen(port, host, function() {
    console.log('Express server listening on port: ' + port);
  });
}