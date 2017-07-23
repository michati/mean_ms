'use strict'

let seneca = require('seneca')();
let Server = require('./server-logic');
let _ = require('lodash');

var opts = _.extend({
  server: {
    port: process.env.API_PORT || 8000,
    host: process.env.API_HOST || '127.0.0.1'
  }
});

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