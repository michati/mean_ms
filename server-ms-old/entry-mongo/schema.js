var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 // var ObjectId = Schema.ObjectId;

 //mongoose.connect('mongodb://127.0.0.1:27017/reg')

var registerSchema = new Schema({
  first: 	 String,
  last:    String, 
  user:    String
});

  Reg = mongoose.model('Reg', registerSchema);
 
  module.exports = Reg;

/*  	var Reg1 = new Reg({
		first: "Bob",
		last: "Fubar",
		user: "bfubar"
  });
  Reg1.save(function (err) {
    if (err) {
      return console.error(err);
    } else {
      console.log('\nReg1 saved');
    } 
  });*/  