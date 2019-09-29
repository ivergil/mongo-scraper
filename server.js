//require packages
var express = require("express");
// var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");



//require scraping packages
var axios = require("axios");
var cheerio = require("cheerio");

//require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// app.use(logger("dev"));
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main",
  partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");

var MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/travelNews";
//connect to mongo BD


mongoose.connect(MONGODB_URI);
// mongoose.connect("mongodb://localhost/travelNews", { useNewUrlParser: true });


//routes...code below

require("./routes/scrape-route.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);




// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});