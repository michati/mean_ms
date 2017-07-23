'use strict'

const UserRegistration = require('./lib/index');

let express = require('express');
let bodyParser = require('body-parser');
let seneca = require('seneca')({
  tag: process.env.TAG,
  internal: {logger: require('seneca-demo-logger')},
  debug: {short_logs:true}
});

module.exports = function (options, done) {

  seneca.use(UserRegistration, options)
  
  var server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false })); 
  server.use(require('seneca-web'));
  
  var port = options.server.port;
  var host = options.server.host;  
  server.listen(port, host, function() {
    console.log('Express server listening on port: ' + port);
  });
}