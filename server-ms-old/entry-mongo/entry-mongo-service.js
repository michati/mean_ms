
var BASES = (process.env.BASES || process.argv[2] || '').split(',')

require('seneca')({
  tag: 'entry_mongo',
  internal: {logger: require('seneca-demo-logger')},
  debug: {short_logs: true}
})
  /*.use('mongo-store', {
    name: 'reg',
    host: '127.0.0.1',
    port: 27017
  })*/
  .use('basic')
  .use('entity')
  .use('entry-mongo-logic')
  .use('mesh',{
    pin: 'store:*,kind:entry',
    bases: BASES
  })
  .ready(function(){
    console.log(this.id +'BASE: '+BASES)
  })
