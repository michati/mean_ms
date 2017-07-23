/*var seneca = require('seneca')();
var mesh = require('seneca-mesh');

var opts = {
  mesh: {
    base: true
  }
}

seneca.use(mesh,opts.mesh)*/


/*var Mesh = require('seneca-mesh');
var seneca = require('seneca')();
var _ = require('lodash');

var opts = _.extend({
  mesh: {
    isbase: true
  }

//Seneca({log: 'test'})

// Start the mesh base
  seneca.use(Mesh, opts.mesh, {

      pin: 'role:tok',
      pin: 'role:store'
    })

  console.log('Mesh Base started...');  */





var Mesh = require('seneca-mesh');
var Seneca = require('seneca')();
var _ = require('lodash');

var opts = {
  mesh: {
    isbase: true
  }
}

// Start the mesh base
    Seneca.use(Mesh, opts.mesh)

  console.log('Mesh Base started...');  




















/*var mesh = require('seneca-mesh');
var seneca = require('seneca')();

seneca.add('role: store, cmd: redisStore', redisStore);

seneca.use(mesh, {
    auto: true,
    listen: [
      {pin: 'role:tok'},
      {pin: 'role:store'}
    ]
  })

//seneca.act('role: rolo, cmd: newToken', function (err, msg) {
//console.log('Rolo Corp count: ' + JSON.stringify(msg));
//})

function redisStore (msg, done) {
  console.log('Entering redisStore...');
  console.log('Msg: ', JSON.stringify(msg));

  console.log('\nMsg.result: ', JSON.stringify(msg.result));
  return done();
  console.log('Leaving redisStore...');
}*/

