'use strict'

module.exports = function (options) {
  let seneca = this

  let name = 'es-setup'

  function init (args, done) {

    // Check the connection to ES
    seneca.act('role: elastic, cmd: checkEsConnection', function (err, res) {
      if (err) {
        return done();
      }
      console.log('\n\nSETUP::checkEsConnection:: res.ok: ' + res.ok);
      if (res.ok === false) {
        // No connection
        console.log('\n\nSETUP::checkEsConnection:: No cluster connection');
        return done();
      }
      // Check if index exists
      seneca.act('role: elastic, cmd: doesEsCorpIndexExist', function (err, idx) {
        if (err) {
          return done();
        }
        console.log('\n\nSETUP::doesEsCorpIndexExist:: idx.exists: ' + idx.exists);
        if (idx.exists === false) {
          // Index does not exist, so let's create it
          seneca.act('role: elastic, cmd: createEsCorpIndex', function (err, indx) {
            if (err) {
              return done();
            }
            console.log('\n\nSETUP::createCorpIndex:: indx.created.acknowledged: ' + indx.created.acknowledged);
            if (indx.created.acknowledged === true) {
              // Index was created.  Now create mapping
              seneca.act('role: elastic, cmd: createEsCorpMapping', 
                function (err, map) {
                  if (err) {
                    return done();
                  }
                  console.log('\n\nSETUP::createEsCorpMapping:: map.created.acknowledged: ' + map.created.acknowledged);
                  if (map.created.acknowledged === true) {
                    // Mapping created.  Now adding data.
                    for (var i = 0; i < 5; ++i) {
                      seneca.act('role: elastic, cmd: seedEsCorpIndex')
                    }  
                  }
                  console.log('\n\nSETUP::createEsCorpMapping:: Mapping could not be created');
            //      return done();  
                })
            }
            console.log('\n\nSETUP::createCorpIndex:: Index could not be created');
          //  return done();
          })
        }
        console.log('\n\nSETUP::doesEsCorpIndexExist:: Index already exists');
        //return done();
      })
    })
    return done();
  }

  seneca.add('init: ' + name, init)

  return {
    name: name
  }
}
