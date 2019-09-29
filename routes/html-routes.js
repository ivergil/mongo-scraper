var db = require("../models");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({ "saved": false })
      .then(function (dbArticles) {
        // If we were able to successfully find Articles, send them back to the client
        var dataObject = {
          articles: dbArticles
        };
        // console.log(dataObject);
        res.render("index", dataObject);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // click en el boton save en home
  app.get("/articles/saved/", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({ "saved": true }).populate("notes")
      .then(function (dbArticles) {
        // If we were able to successfully find Articles, send them back to the client
        var dataObject = {
          articles: dbArticles
        };
        // console.log(dataObject);
        res.render("saved", dataObject);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


};