var seneca = require('seneca')();
var mesh = require('seneca-mesh');

var opts = {
  mesh: {
    base: true
  }
}

seneca.use(mesh,opts.mesh)