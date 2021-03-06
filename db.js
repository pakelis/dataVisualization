const promise = require("bluebird");
const monitor = require("pg-monitor");
require("dotenv").config();

const initOptions = {
  promiseLib: promise,
};

const pgp = require("pg-promise")(initOptions, {
  capSQL: true,
});

monitor.attach(initOptions);

const cn = {
  user: process.env.REACT_APP_DB_USER,
  host: process.env.REACT_APP_DB_HOST,
  database: process.env.REACT_APP_DB_DATABASE,
  password: process.env.REACT_APP_DB_PASSWORD,
  port: process.env.REACT_APP_DB_PORT,
};

const db = pgp(cn);

/* db.any(`SELECT * FROM renginiu_finansavimas WHERE id = $1`, [2])
  .then(data => {
    console.log("DATA:", data);
  })
  .catch(error => {
    console.log("ERROR:", error);
  });


  TESTING pg-promise
  */

module.exports = db;

/* const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "data_visualization",
  password: "root",
  port: "5432"
});

module.exports = pool;

PG implementation, now we use pg-promise
*/
