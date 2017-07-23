'use strict'

var jwt = require('jsonwebtoken');

// load related modules
module.exports = function (options) {
  var seneca = this

  var name = 'cmmicro-token-api'

  function newToken (msg, response) {

    console.log('Entering GET /newToken...');

    var token = jwt.sign({foo: 'bar'}, 'blahblahblah');

    //seneca.act('role: tok, cmd: transfertoken', {token: token})

    return response(null, {ok: true, token: token});

    console.log('Leaving GET /newToken...');

  }

  function authToken (msg, response) {

    console.log('Entering GET /authToken...');

    console.log('req.body.token: ' + msg.req$.body.token);
    console.log('req.query.token: ' + msg.req$.query.token);
    console.log('req.headers[x-access-token]: ' + msg.req$.headers['x-access-token']);

    var token = msg.req$.body.token || msg.req$.query.token || msg.req$.headers['x-access-token'];

    console.log('Token: ' + token);

    if (token) {
      jwt.verify(token, 'blahblahblah', function(err, decoded) {      
        if (err) {
          return response(null, {ok: false, why: err});    
        } else {
          if (decoded) {
            console.log('Token decoded: ' + JSON.stringify({ decoded }));
            return response(null, {ok: true, status: 200});
          }
        }
      });
    } else {
      return response(null, {ok: true, status: 403, why: 'Token not valid.'});
    }

    console.log('Leaving GET /authToken...');

  }

  function init (args, done) {
    seneca.act({
      role: 'web', use: {
        name: 'tok',
        prefix: '/token',
        pin: {role: 'tok', cmd: '*'},
        map: {
          newToken: {GET: true, alias: 'gettoken'},
          authToken: {GET: true, alias: 'authtoken'}
        }
      }
    })

    seneca
      .add('role: tok, cmd: newToken', newToken)
      .add('role: tok, cmd: authToken', authToken)

    done()
  }

  seneca.add('init: ' + name, init)

  return {
    name: name
  }
}