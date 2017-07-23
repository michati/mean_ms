var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 // var ObjectId = Schema.ObjectId;

var registerSchema = new Schema({
  first: 	 String,
  last:    String, 
  user:    String
});

  Reg = mongoose.model('Reg', registerSchema);
 
  module.exports = Reg;

	var Reg1 = new Reg({
		first: "Jim",
		last: "Blah",
		user: "jblah"
  });
  Reg1.save(function (err) {
    if (err) {
      return console.error(err);
    } else {
      console.log('\nReg1 saved');
    } 
  });  