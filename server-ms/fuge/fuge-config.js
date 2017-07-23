var BASES = (process.env.BASES || '127.0.0.1:39000,127.0.0.1:39001')
var OPTS = (process.env.OPTS || '--seneca.options.debug.undead=true --seneca.options.plugin.mesh.sneeze.silent=1')

module.exports = {
  runDocker: false,
  tail: true,
  restartOnError: true,
  overrides: {
    /*mongoDB: { 
      run: '/usr/local/bin/mongod --dbpath /Users/michati/Development/Microservices/mean-ms/data/db'
    },*/
    base0: { 
      run: 'node ./base/base.js base0 39000 '+BASES+' '+OPTS
    },
    base1: { 
      run: 'node ./base/base.js base1 39001 '+BASES+' '+OPTS
    },
    api: { 
      run: 'node ./registration_api/start.js registration_api '+BASES+' '+OPTS
    },
    ch: { 
      run: 'node ./check_mongo/check_mongo_service.js 0 '+BASES+' '+OPTS
    },
    seed: { 
      run: 'node ./seed_mongo/seed_mongo_service.js 0 '+BASES+' '+OPTS
    }
  }
};

