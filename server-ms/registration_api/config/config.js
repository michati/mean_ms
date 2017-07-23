module.exports = function () {
  function mailConfig () {
    return {
      mail: {
        from: 'no-reply@blah.com'
      },
      config: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
          ignoreTLS: true
        }
      }
    }
  }

  function adminDataConfig () {
    return {
      name: process.env.USER_NAME || 'Admin',
      email: process.env.USER_EMAIL || 'admin@blah.com',
      password: process.env.USER_PASS || 'rolo'
    }
  }

  function dbConfig () {
    return {
      dbname: process.env.DB_NAME,
      dbport: process.env.DB_PORT,
      dbhost: process.env.DB_HOST
    }
  }

  function transportClientConfig () {
    return {
      clientPort: process.env.TRANSPORT_PORT,
      clientHost: process.env.TRANSPORT_HOST,
      clientType: process.env.TRANSPORT_TYPE
    }
  }

  function seedDataRoloCorp () {
    return {
      corpName:    'Happy Friendly LLC.',
      corpPoc:     {
        name:       'Slim Jim', 
        phone:      '703-887-1233',
        email:      'slim@jim.com'
      },  
      corpAddress: {
        street:     '123 Fisk St.',
        city:       'Tuppy',
        state:      'CA',
        country:    'USA',
        postalCode: '1234-9766'
      },
      corpInfo:     {
        webSite:    'http://happy.com',
        phone:      '888-654-9999',
        desc:       'HF is a happy friendly place!',
        mapCoord:   {
          lat:      '5667',
          lon:      '7645'
        }
      } 
    }
  }

  return {
    'mail': mailConfig(),
    'adminData': adminDataConfig(),
    'db': dbConfig(),
    'transClient': transportClientConfig(),
    'seedRoloCorp': seedDataRoloCorp()
  }
}


