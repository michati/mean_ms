'use strict'

const RoloMicro = require('./lib/index');

let express = require('express');
let bodyParser = require('body-parser');
let seneca = require('seneca')();

module.exports = function (options, done) {

  //let seneca = this;

  seneca.use(RoloMicro, options)
  

  var server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false })); 
  server.use(seneca.export('web'));
  //server.seneca.use(CmMicro, options);
  
  var port = options.server.port;
  var host = options.server.host;  
  server.listen(port, host, function() {
    console.log('Express server listening on port: ' + port);
  });

  //server.seneca.use(CmMicro, options);

  //done(server);
}
