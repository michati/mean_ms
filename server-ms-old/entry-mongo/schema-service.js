'use strict';

var mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {
	// Use Mongoose to connect to MongoDB
	var db = mongoose.connect('mongodb://127.0.0.1:27017/reg');

	// Load the 'Contacts' model 
	require('./schema');

	// Return the Mongoose connection instance
	return db;
};