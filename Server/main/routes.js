var express = require("express");
var router = express.Router();
var pool = require("./db");

/* TEST CONNECTION  
//the pool will emit and error on behalf of any idle clients
//it contains if a backend error or network partition happens
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.connect((err, client, done) => {
  if (err) throw err;
  client.query(
    `SELECT * FROM siauliai_sportas.renginiu_finansavimas WHERE id = $1`,
    [1],
    (err, res) => {
      done();

      if (err) {
        console.log(err);
      } else {
        console.log(res.rows[0]);
      }
    }
  );
});
*/

/*
   ROUTES SECTION
*/

router.get("/api/hello", (req, res) => {
  res.json("Hello from /api/hello");
});

//Get all table data from it's name
router.get(`/api/get/table/`, (req, res, next) => {
  const project_name = req.query.project_name;

  pool.query(`SELECT * FROM ${project_name}`, (q_err, q_res) => {
    res.json(q_res.rows);
  });
});

router.get("/api/get/tableone", (req, res, next) => {
  const id = req.query.id;

  pool.query(
    `SELECT * FROM renginiu_finansavimas where id=$1`,
    [id],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

module.exports = router;
