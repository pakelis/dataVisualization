var express = require('express')
var router = express.Router()
var db = require('./db')
const pgp = require('pg-promise')({
  capSQL: true,
})

function cleanUpSpecialChars(str) {
  // we need this function so we can use pg promise set column, they only accept variables as strings
  return str
    .replace(/[ĖĘ]/g, 'E')
    .replace(/[ėę]/g, 'e')
    .replace(/[č]/g, 'c')
    .replace(/[Č]/g, 'C')
    .replace(/[ą]/g, 'a')
    .replace(/[Ą]/g, 'A')
    .replace(/[į]/g, 'i')
    .replace(/[Į]/g, 'I')
    .replace(/[ųū]/g, 'u')
    .replace(/[ŲŪ]/g, 'U')
    .replace(/[Š]/g, 'S')
    .replace(/[š]/g, 's')
    .replace(/[ž]/g, 'z')
    .replace(/ /g, '_')
    .replace(/\./g, '')
    .replace('{', '')
    .replace('}', '')
    .replace('(', '')
    .replace(')', '')
    .replace('.', '')
    .replace(/[^a-zA-Z0-9_]/, '')
}

/*
   ADMIN ROUTES SECTION
*/

//All these routes will require token in frontend
// Define an endpoint that must be called with an access token
//Private route
router.get('/api/external', (req, res) => {
  res.send({
    msg: 'Your Acces Token was succesfully validated',
  })
})

router.get('/api/externalhello', (req, res) => {
  res.send({
    msg: 'Hello external world',
  })
})

//file upload route
router.post('/api/upload', (req, res) => {
  if (req.body == null) {
    return res.status(400).json({msg: 'No data found in a request body'})
  }

  const rows = req.body.rows
  let fields = req.body.fields
  fields = fields.map(string => cleanUpSpecialChars(string))
  const tableName = cleanUpSpecialChars(req.body.tableName)

  // console.log(fields)
  // console.log(rows[0])
  // console.log(tableName)

  // we get all our field types so we can use this in our query to create dynamic table (needs reworking though)
  const propertyType = () => {
    let types = []
    for (let [key, value] of Object.entries(rows[0])) {
      if (typeof value === 'number') {
        types.push('NUMERIC')
      } else if (typeof value === 'string') {
        types.push('VARCHAR(255)')
      }
    }
    return types
  }

  const propTypes = () => {
    let types = []
    columns = Object.keys(rows).length
    console.log(columns)

    rows.map(row => {
      let types = []
      for (let [key, value] of Object.entries(row)) {
        if (typeof value === 'number') {
        }
      }
    })
  }

  propTypes()

  const fieldTypes = propertyType()

  const cs = new pgp.helpers.ColumnSet(fields, {table: tableName})

  const query = pgp.helpers.insert(rows, cs)

  // console.log(fieldTypes)
  // console.log(fields)

  db.task('create-insert-csv', async t => {
    const testQuery = await t.none(`create table if not exists $1:name()`, [
      tableName,
    ])
    const insertColumns = await fields.map((l, index) => {
      return t.none(
        `alter table $1:name add column if not exists $2:name $3:value`,
        [tableName, fields[index], fieldTypes[index]],
      )
    })
    await db.none(query)
  })
    .then(events => {
      console.log('table created!', events)
    })
    .catch(err => {
      console.log('something wrong!', err)
    })
})

/* db.none(
    `create table NVO_finansuoti_aplinkosauginio_svietimo_projektai (
  id serial primary key,
  year smallint,
  project_name varchar(255)
)`
  )
    .then(events => console.log("Table created!", events))
    .catch(err => {
      console.log(err);
    });
}); */

module.exports = router
