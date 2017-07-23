var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 // var ObjectId = Schema.ObjectId;

  var transClientSchema = new Schema({
    clientHost: String,
    clientPort: String,
    clientType: String,
    clientStarted: {type: Date, default: Date.now}
	});

  transClient = mongoose.model('transClient', transClientSchema);
 
  module.exports = transClient;



 /*var book1 = new Book({
    _bookId: 1,
    chapterIds: "88765",
    mrs: "BBT-678",
    categories: [{
              _categoryId: 1,
              name: "drama",
              topic: [{
                  name: "The life of bugs",
                  version: "34",
                  publish: [{
                      name: "Some publisher",
                      pubType: "book publisher",
                      start: "",
                      end: ""
                            }]
                      }]
                  }],
    milestones: [{
              reason: "Boook was number one bestseller",
              forum: "Book of the yeat"
                }]
  });
  book1.save(function (err) {
    if (err) {
      return console.error(err);
    } else {
      console.log('\nbook1 saved');
    } 
  });  

  var book2 = new Book({
    _bookId: 2,
    chapterIds: "12345",
    mrs: "ADF-777",
    categories: [{
              _categoryId: 2,
              name: "fiction",
              topic: [{
                  name: "Game of Thrones",
                  version: "2",
                  publish: [{
                      name: "Some publisher2",
                      pubType: "book publisher2",
                      start: "",
                      end: ""
                            }]
                      }]
                  }],
    milestones: [{
              reason: "Shown on HBO",
              forum: "Show of the year!"
                }]
  });
  book2.save(function (err) {
    if (err) {
      return console.error(err);
    } else {
      console.log('\nbook2 saved');
    } 
  }); 

    var book3 = new Book({
    _bookId: 3,
    chapterIds: "78654",
    mrs: "CTC-123",
    categories: [{
              _categoryId: 3,
              name: "Comedy",
              topic: [{
                  name: "The Nerd",
                  version: "6",
                  publish: [{
                      name: "Some publisher3",
                      pubType: "book publisher3",
                      start: "",
                      end: ""
                            }]
                      }]
                  }],
    milestones: [{
              reason: "Book comedy",
              forum: "Funny Book"
                }]
  });
  book3.save(function (err) {
    if (err) {
      return console.error(err);
    } else {
      console.log('\nbook3 saved');
    } 
  }); 

    var book4 = new Book({
    _bookId: 4,
    chapterIds: "55667",
    mrs: "DFD-099",
    categories: [{
              _categoryId: 4,
              name: "biography",
              topic: [{
                  name: "The life and times of Joe Bob",
                  version: "1",
                  publish: [{
                      name: "Some publisher3",
                      pubType: "book publisher4",
                      start: "",
                      end: ""
                            }]
                      }]
                  }],
    milestones: [{
              reason: "Reason4",
              forum: "forum4"
                }]
  });
  book4.save(function (err) {
    if (err) {
      return console.error(err);
    } else {
      console.log('\nbook4 saved');
    } 
  });*/
