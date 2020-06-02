var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

//We import our router from routes.js
var indexRouter = require("./routes");
var adminRouter = require("./admin_routes");
var app = express();

//Set up Auth0 configuration
const authConfig = {
  domain: "dev-g2qmjdu7.eu.auth0.com",
  audience: "http://localhost:3000"
};

//Define middleware that validates incoming bearer tokens
// using JWKS from YOUR_DOMAIN
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256jk"]
});

/* // Define an endpoint that must be called with an access token
//Private route
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Acces Token was succesfully validated"
  });
});

app.get("/api/externalhello", (req, res) => {
  res.send({
    msg: "Hello external world"
  });
});
*/

app.use(logger("dev"));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//To use our router we say

app.use("/", indexRouter);
// all routes in /admin wil be checked JWT, so we need token in front end if we want to use those
app.use("/admin", checkJwt, adminRouter);

module.exports = app;
