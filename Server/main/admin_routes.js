var express = require("express");
var router = express.Router();
var db = require("./db");
const pgp = require("pg-promise")({
  capSQL: true,
});
var cleanUpSpecialChars = require("./functions");
var capitalizeFirstLetter = require("./functions");

/*
   ADMIN ROUTES SECTION
*/

//All these routes will require token in frontend
// Define an endpoint that must be called with an access token
//Private route
router.get("/api/external", (req, res) => {
  res.send({
    msg: "Your Acces Token was succesfully validated",
  });
});

router.get("/api/externalhello", (req, res) => {
  res.send({
    msg: "Hello external world",
  });
});

//file upload route
router.post("/api/upload", (req, res) => {
  if (req.body == null) {
    return res.status(400).json({ msg: "No data found in a request body" });
  }

  const rows = req.body.rows;
  let fields = req.body.fields;
  fields = fields.map(
    (string) => cleanUpSpecialChars(string) && string.toLowerCase()
  );
  let tableName = cleanUpSpecialChars(req.body.tableName);
  tableName = capitalizeFirstLetter(tableName);

  // we get all our field types so we can use this in our query to create dynamic table
  // e.g sometimes the first row[0] property values can show string, but on row[25], maybe it's numeric value, so we have to check all passed rows property values
  // to make sure we describe correct column data type
  const propTypes = () => {
    let sizeOfArray = fields.length;
    const types = Array.from(Array(sizeOfArray), () => Array(0)); // we create empty two dimensional array depending on fields length
    // console.log(sizeOfArray, types);

    rows.map((row) => {
      let index = 0;
      for (let [key, value] of Object.entries(row)) {
        //we loop through all rows, and check their property values
        console.log(key, fields[index]);
        if (key === fields[index]) {
          let newValue = () => {
            if (typeof value === "string") {
              let isDate = Date.parse(value) ? "date" : "string";
              return isDate;
            } else if (typeof value === "number") {
              let isNumber = "number";
              return isNumber;
            }
          };

          types[index].push(newValue());
          /* console.log(
            `index: ${index} , key: ${key} , field: ${fields[index]}`
          );*/
          // console.log(types);
        }
        index++;
        if (index > sizeOfArray) {
          index = 0;
        }
      }
    });

    let columnTypes = () => {
      //we check types array if every array got the same value
      let columnTypes = [];
      /* for (let i = 0; i < fields.length; i++) {
        types[i].every(val => val === "number")
          ? columnTypes.push("NUMERIC")
          : columnTypes.push("VARCHAR(255)");
      }*/

      for (let i = 0; i < fields.length; i++) {
        types[i].every((val) => val === "number")
          ? columnTypes.push("NUMERIC")
          : types[i].every((val) => val === "date")
          ? columnTypes.push("DATE")
          : columnTypes.push("VARCHAR(255)");
      }

      return columnTypes;
    };

    return columnTypes();
  };

  const fieldTypes = propTypes(); // get column data types
  const cs = new pgp.helpers.ColumnSet(fields, { table: tableName }); // pgp.helpers.ColumnSet - helper to insert multirow data from pg-promise module
  const query = pgp.helpers.insert(rows, cs); // insert multi row data query

  console.log(fieldTypes);
  console.log(tableName);

  db.task("create-insert-csv", async (t) => {
    //First we create empty table
    const testQuery = await t.none(`create table if not exists $1:name()`, [
      tableName,
    ]);
    //Here we add columns depending on response data
    const insertColumns = await fields.map((l, index) => {
      return t.none(
        `alter table $1:name add column if not exists $2:name $3:value`,
        [tableName, fields[index], fieldTypes[index]]
      );
    });
    await db.none(query);
  })
    .then((events) => {
      console.log("table created!", events);
      res.send({
        success: "Data successfully submited to DB!",
      });
    })
    .catch((err) => {
      console.log("something wrong!", err);
      res.send({
        error: "Something went wrong!",
      });
    });
});

//Get all table names in DB
router.get("/api/tablenames", (req, res) => {
  db.any(
    `select * from pg_catalog.pg_tables where 
        schemaname != 'pg_catalog' and schemaname != 'information_schema' 
      `
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

router.get("/api/tablecolumns", (req, res) => {
  const tableName = req.query.tableName;
  console.log(tableName);

  db.any(
    `select column_name, data_type from information_schema.columns where table_name = '$1:value'`,
    [tableName]
  )
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

router.get("/api/selectedtable", (req, res) => {
  const tableName = req.query.tableName;
  console.log(tableName);

  db.any(`select * from $1:name`, [tableName])
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

module.exports = router;
