var BASES = (process.env.BASES || process.argv[2] || '').split(',')


require('seneca')({
  tag: 'schema',
  internal: {logger: require('seneca-demo-logger')},
  debug: {short_logs: false}
})
  /*.use('mongo-store', {
    name: 'reg',
    host: '127.0.0.1',
    port: 27017
  })*/
  .use('mongo-schema-logic')
  .use('mesh',{
    pin: 'store:schema,cmd:*',
    bases: BASES
  })
  .ready(function(){
    console.log(this.id +'BASE: '+BASES)
  })