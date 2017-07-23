var HOST = process.env.HOST || '127.0.0.1'
var BASES = (process.env.BASES || process.argv[3] || '').split(',')
var SILENT = true

require('seneca')({
  tag: process.env.TAG,
  //internal: {logger: require('seneca-demo-logger')},
  debug: {short_logs: true}
})

  .use('seed_mongo_logic')
  .use('mesh',{
    pin: 'store:seed,cmd:*',
    bases: BASES,
    host: '127.0.0.1',
    sneeze:{
      silent: JSON.parse(SILENT),
      swim: {interval: 1111}
    }
  })
  .ready(function(){
    console.log(this.id)
  })