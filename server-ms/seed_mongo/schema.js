var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 // var ObjectId = Schema.ObjectId;

var userDataSchema = new Schema({
	first: String,
  last: String,
  userId: String,
  pw: String
});

  UserSchema = mongoose.model('UserSchema', userDataSchema);
 
  module.exports = UserSchema;

 /* var User1 = new UserSchema({
    first: "Bob",
    last: "Fubar",
    userId: "bfubar",
    pw: "passord123"
  });
  User1.save(function (err) {
    if (err) {
      return console.error(err);
    } else {
      console.log('\nUser1 saved');
    } 
  }); 

  var User2 = new UserSchema({
    first: "Tim",
    last: "Jones",
    userId: "tjones",
    pw: "p@55word"
  });
  User2.save(function (err) {
    if (err) {
      return console.error(err);
    } else {
      console.log('\nUser2 saved');
    } 
  }); */