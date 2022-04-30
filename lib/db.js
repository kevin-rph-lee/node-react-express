let dbParams = {};
if (process.env.DATABASE_URL) {
  console.log('Connecting to Heroku DB')
  dbParams.connectionString = process.env.DATABASE_URL;
  dbParams.ssl = {
    require: true,
    rejectUnauthorized: false
  }
} else {
  console.log('Connecting to Local DB')
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

module.exports = dbParams;
