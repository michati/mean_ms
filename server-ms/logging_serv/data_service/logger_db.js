var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 // var ObjectId = Schema.ObjectId;

  var loggerDataSchema = new Schema({
    actionType: String,
    status: String,
    actionData: String,
    actionDate: {type: Date, default: Date.now},
    remoteAddress: String
	});

  loggerData = mongoose.model('loggerData', loggerDataSchema);
 
  module.exports = loggerData;