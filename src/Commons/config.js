/* istanbul ignore file */
let config

if (process.env.NODE_ENV === 'test') {
  config = {
    app: {
      host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
      port: process.env.PORT_TEST
    },
    database: {
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE_TEST
    },
    jwt: {
      accessTokenKey: process.env.ACCESS_TOKEN_KEY,
      accessTokenAge: process.env.ACCESS_TOKEN_AGE,
      refreshTokenKey: process.env.REFRESH_TOKEN_KEY
    }
  }
} else {
  config = {
    app: {
      host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
      port: process.env.PORT
    },
    database: {
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE
    },
    jwt: {
      accessTokenKey: process.env.ACCESS_TOKEN_KEY,
      accessTokenAge: process.env.ACCESS_TOKEN_AGE,
      refreshTokenKey: process.env.REFRESH_TOKEN_KEY
    }
  }
}

module.exports = config
