const {Pool} = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'data_visualization',
  password: '',
  port: '5432',
})

module.exports = pool
