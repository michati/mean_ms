'use strict'

const RoloMesh = require('./lib/index');

var Mesh = require('seneca-mesh');
var seneca = require('seneca')();
var _ = require('lodash');


	// load env config file
	var DotEnv = require('dotenv');
	DotEnv.config({path: './config/development.vars.env'});

	const LoadConfig = require('./config/config.js');
	const Config = LoadConfig();

	var options = _.extend({
  	mesh: {
    	auto: true,
    	listen: [
      	{pin: 'role: tok'},
      	{pin: 'cache: store'}
    	]
  	}
	}, Config);

  seneca.use(Mesh, options.mesh)
  seneca.use(RoloMesh, options)