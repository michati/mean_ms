'use strict'

module.exports = [
  {
    prefix: '/api/v1',
    pin: 'role:api,cmd:*',
    map: {
      listAllUsers: {name: 'allRegisteredUsers', GET: true, alias: '/all'},
      postUser: {name: 'postRegisteredUser', GET: true}
    }
  },
  {
    prefix: '/admin/v1',
    pin: 'role:store,cmd:*',
    map: {
      checkDbConnection: {name: 'checkMongoConnection', GET: true, alias: '/check'},
      seedMongo: {name: 'seedMongoDb', GET: true, alias: '/seed'}
    }
  }
]