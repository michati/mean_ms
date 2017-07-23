
var db = require('./schema-service')
var User = db().model('Reg')

module.exports = function entry_mongo (options) {
  var seneca = this

  function getEntryList(msg, done) {
    console.log('Inside getEntryList...')
    User.find({}, function(error, entity){
      if(error) {
        console.log('ERROR: ', error)
        done(null, error)
      }
      done(null,entity)
    })
  }

  function postEntryUser(msg, done) {
    console.log('postEntryUser: ', msg.user, msg.payload)
    done()
  }

  seneca.add('store:list,kind:entry', getEntryList)
  seneca.add('store:store,kind:entry', postEntryUser)

}
