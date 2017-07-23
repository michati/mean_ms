var express = require('express');
var router = express.Router();
//var userService = require('services/user.service');

module.exports = function api_logic (options) {
  var seneca = this

  router.get('/api/ping', apiPing);
router.get('/api/all', getAllUsers);
//router.put('/:_id', update);
//router.delete('/:_id', _delete);
module.exports = router;

  function apiPing(req, res) {
    seneca.act('role:api,cmd:ping', function(err, result) {
      res.send({result: err ? 'error' : result, err: err});
    });
  }


  function getAllUsers(req, res) {
    seneca.act('store:list,kind:entry', function(err, result) {
      res.send({result: err ? 'error' : result, err: err});
    });
  }

  /*router.post('/regi/{user}', function(req, res) {
    console.log('/regi: ', req.params, req.payload)
    seneca.act('store:save,kind:entry', 
      {user: req.params.user, payload: req.payload.text},
      function(err, result) {
      res.send({result: err ? 'error' : result, err: err});
    });
  });*/

seneca
  .add('role:api,cmd:ping', function(msg,done){
    done( null, {pong:true,api:true,time:Date.now()})
  })
}

// routes
//router.post('/authenticate', authenticate);
//router.post('/register', register);
//router.get('/api/ping', apiPing);
//router.get('/api/all', getAllUsers);
//router.put('/:_id', update);
//router.delete('/:_id', _delete);
//module.exports = router;