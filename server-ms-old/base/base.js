// node base.js base0 39000 127.0.0.1 127.0.0.1:39000,127.0.0.1:39001
// node base.js base1 39001 127.0.0.1 127.0.0.1:39000,127.0.0.1:39001

var TAG = process.env.TAG || process.argv[2] || 'base'
var PORT = process.env.PORT || process.argv[3] || 39999
var BASES = (process.env.BASES || process.argv[4] || '').split(',')
var SILENT = true


require('seneca')({
  tag: TAG,
  internal: {logger: require('seneca-demo-logger')},
  debug: {short_logs:true}
})
  //.test(console.log,'print')
  //.use('zipkin-tracer', {sampling:1})
  .use('mesh',{
    isbase: true,
    port: PORT,
    host: '127.0.0.1',
    bases: BASES,
    pin:'role:mesh',
    sneeze: {
      silent: JSON.parse(SILENT),
      swim: {interval: 1111}
    }
  })
  .ready(function(){
    console.log(this.id +' TAG: '+TAG+' PORT: '+PORT+' BASE: '+BASES)
  })
