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
    prefix: '/store/v1',
    pin: 'role:store,cmd:*',
    map: {
      checkDbConnection: {name: 'checkMongoConnection', GET: true, alias: '/check'},
    }
  },
  {
    prefix: '/store/v1',
    pin: 'role:store,cmd:*',
    map: {
      seedMongo: {name: 'seedDb', GET: true, alias: '/seed'},
    }
  }
]