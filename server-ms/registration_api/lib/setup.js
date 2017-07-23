'use strict'

module.exports = function (options) {
  let seneca = this

  let name = 'database-setup'

  function init (args, done) {
    seneca.act('role: rolo, cmd: connectToDb', function (err, res) {
      if (err) {
        return done();
      }
      seneca.act('role: rolo, cmd: checkRoloCorpCollection', 
        function (err, msg) {
          if (err) {
            return done();
          }
          //console.log('Rolo Corp count: ' + JSON.stringify(msg));
          //console.log('msg.count: ' + msg.count);
          if (msg.count === 0) {
            seneca.act('role: rolo, cmd: seedRoloCorpCollection',
              function (err, result) {
                if (err) {
                  return done();
                }
                //.console.log('Rolo Corp count: ' + JSON.stringify(result));
            });
          }
      });

      seneca.act('role: rolo, cmd: checkTransClientCollection',
        function (err, msg) {
          if (err) {
            return done();
          }
          //console.log('Trans Client count: ' + JSON.stringify(msg));
          //console.log('msg.count: ' + msg.count);
          if (msg.count === 0) {
            seneca.act('role: rolo, cmd: seedTransClientCollection',
              function (err, result) {
                if (err) {
                  return done();
                }
                //console.log('Rolo Corp count: ' + JSON.stringify(result));
            });
          }
      });  
    });

    return done();
  }

  seneca.add('init: ' + name, init)

  return {
    name: name
  }
}
