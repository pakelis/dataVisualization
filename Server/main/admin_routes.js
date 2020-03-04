var express = require("express");
var router = express.Router();
var pool = require("./db");
const fileUpload = require("express-fileupload");

/*
   ADMIN ROUTES SECTION
*/

//All these routes will require token in frontend
// Define an endpoint that must be called with an access token
//Private route
router.get("/api/external", (req, res) => {
  res.send({
    msg: "Your Acces Token was succesfully validated"
  });
});

router.get("/api/externalhello", (req, res) => {
  res.send({
    msg: "Hello external world"
  });
});

//file upload route
router.post("/api/upload", (req, res) => {
  if (req.body == null) {
    return res.status(400).json({ msg: "No data found in a request body" });
  }

  const rows = req.body.rows;
  const fields = req.body.fields;

  console.log(fields);
});

module.exports = router;
