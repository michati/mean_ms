'use strict'

let seneca = require('seneca')();
let Server = require('./server');
let _ = require('lodash');

var opts = _.extend({
  server: {
    port: process.env.PORT || 8000,
    host: process.env.HOST
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
