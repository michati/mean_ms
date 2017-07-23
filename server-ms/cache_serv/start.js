'use strict'

let seneca = require('seneca')();
let Server = require('./server');
let _ = require('lodash');

// load env config file
var DotEnv = require('dotenv');
DotEnv.config({path: './config/development.vars.env'});

const LoadConfig = require('./config/config.js');
const Config = LoadConfig();

var opts = _.extend({
  server: {
    port: process.env.PORT || 10020,
    host: process.env.HOST
  }
}, Config);

// Log and end the process on err.
function endIfErr (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
}

// Create our server.
Server(opts, function (err, server) {
	console.log('Inside start::Server()...');
  endIfErr(err)

  // Kick off the server.
  server.start(function (err) {
    endIfErr(err)
    //server.seneca.log.debug('Listening at: ' + server.info.port)
  })
      console.log('Server started...');
})
