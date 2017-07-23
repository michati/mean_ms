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
      password: process.env.USER_PASS || 'cmmicro'
    }
  }

  function transportClientConfig () {
    return {
      clientPort: process.env.TRANSPORT_PORT,
      clientHost: process.env.TRANSPORT_HOST,
      clientType: process.env.TRANSPORT_TYPE
    }
  }

  return {
    'mail': mailConfig(),
    'adminData': adminDataConfig(),
    'transClient': transportClientConfig()
  }
}


