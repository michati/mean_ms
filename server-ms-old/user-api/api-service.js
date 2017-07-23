
'use strict';

var bodyParser = require('body-parser');
var methodOverride = require('method-override')
//var mongoose = require('./data-service/mongoose');
var express = require('express');
//var seneca = require('seneca')();

//var db = mongoose();
var app = express();


/* var opts = {
  vidi_metrics: {
    emitter: {
      enabled: false
    }
  },
  seneca_metrics: {
    group: 'ms-spin',
    tag: 'api',
    pins: [
      'role:web,cmd:*'
    ]
  }
}

  seneca.use('vidi-metrics', opts.vidi_metrics);
  seneca.use('vidi-seneca-metrics', opts.seneca_metrics);*/

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride()); 
//app.use(seneca.export('web'));

//seneca.use('./api-service/api-listener');
console.log('\nAPP.JS::Starting client on port 10050\n');
//seneca.client({port:10050});

//seneca.use('./api-service/api');

var port = process.env.PORT || 10010;
app.listen(port);
console.log('Server started on:' + port);
/*var PORT = process.env.PORT || process.argv[2] || 0
var BASES = (process.env.BASES || process.argv[3] || '').split(',')
var HOST = '127.0.0.1'

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var seneca = require('seneca')()

//app.use(cors());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
/*app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register'] }));

// routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(seneca.export('web'));
//app.use('/users', require('./api-logic'));



/*seneca.use('/api-logic')
seneca
  .use('mesh',{
    bases: BASES,
    host: HOST
  })

app.listen({
  port: 8000,
  host: HOST
}, function() {
  console.log('listening on port: 8000');
});*/
