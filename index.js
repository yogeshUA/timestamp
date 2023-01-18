// index.js
// where your node app starts

// init project
var express = require("express");
const moment = require("moment");
require("dotenv").config();

var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  const reqDate = req.params.date;
  let date;

  // check if no date provided
  if (!reqDate) {
    date = new Date();
  } else {
    // check if unix time:
    //    number string multiplied by 1 gives this number, data string gives NaN
    const unixDateCheck = reqDate * 1;
    date = isNaN(unixDateCheck) ? new Date(reqDate) : new Date(unixDateCheck);
  }

  //check if valid format
  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    const unix = date.getTime();
    const utc = date.toUTCString();
    res.json({ unix, utc });
  }
});

// listen for requests :)l LT
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + process.env.PORT || 3000);
});
