//var Mongoose = require('mongoose')
var registration = require('./schema')

module.exports = function entry_mongo (options) {
  var seneca = this

  seneca.add('store:list,kind:entry', function(msg, done) {
    
    var entity =  seneca.make$(registration)
    entity.list$({}, function(err, entity) {
        if(err) return done(err)
      })
     done( null, entity )
  })

 /* function connMongo () {  

    console.log('Connecting to Mongo server...')
    var dbName = 'reg';
    var dbHost = '127.0.0.1';
    var dbPort = 27017;
    var uri = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

    Mongoose.connect(uri, {auto_reconnect: true, native_parser: true}, function (err) {
      if (err) {
        console.log('Could not connect to: ' + uri)
        return err  
      }
      console.log('Connected to Mongo server: ' + uri)
    })
  }*/

  /*function storeUser (msg, response) {  

   // var regDb = require('./schema')
    //console.log('storeUser::msg: ', msg.first)

    //console.log('entry_mongo.storeUser::regData: ' + regData);
    if (msg) {
          return response(null,{ok: true, why: 'went ok!'})
    }

  }
      seneca
      .add('store:save,cmd:storeUser', storeUser)*/

  /*function storeUser (msg, response) {  

    //var regDb = require('./register-schema')
    console.log('storeUser::msg: ', msg.first)

    //console.log('entry_mongo.storeUser::regData: ' + regData);
    if (msg) {
      seneca.make$(registration, {first: msg.first,last: msg.last,user: msg.user})
        .save$(function (err, client) {
        if (err) {
          return response(null,{ok: false, why: err})
        }
        //console.log('entry_mongo.storeUser::client.data$: ' + {data:client.data$()})
        return response(null,{ok: true, data: client.data$()})
      })
    }

  }*/

/*  seneca.add('store:save,kind:entry', function(msg, done) {
    
    this.make$('userreg',{
        first: msg.first,
        last: msg.last,
        userid: msg.user
        )}
        .save$(function(err, userreg) {
        if(err) return done(err)
      })
        done(null)
  })*/

  /*seneca.add('store:save,kind:entry', function(msg, done) {
      //console.log('add:/api/seed: ', msg)
      var entity = seneca.make$('regs')
      entity.first = msg.first,
      entity.last = msg.last,
      entity.user = msg.user
      entity.save$(function (err, entity) { 
          if (err) {
            return done(null, {ok: false, why: err})
          }
          return done(null, {ok: true, entity: entify})
 
      })
      })*/
  
  /*seneca.add('store:list,kind:entry', function(msg, done) {
    this
      .make$('user-reg')
      .list$( {user:msg.user}, function(err, list) {
        if(err) return done(err)
      })
     done( null, list )
  })*/
}
