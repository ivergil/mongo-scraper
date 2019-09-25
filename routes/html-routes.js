var db = require("../models");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({"saved": false})
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

  app.get("/articles/saved/", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({"saved": true})
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

  app.get("/articles/note/:id", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.findOne({"_id": req.params.id})
      .then(function (dbArticles) {
        // If we were able to successfully find Articles, send them back to the client
        var dataObject = {
          articles: dbArticles
        };
        // console.log(dataObject);
        res.render("notes", dataObject);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

};