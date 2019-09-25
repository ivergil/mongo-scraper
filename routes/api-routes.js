// Require all models
var db = require("../models");
ObjectId = require('mongodb').ObjectID
var mongoose = require('mongoose');

module.exports = function (app) {

    //when user submits comments then run post api route to let them create a new note


    app.post("/api/articles/saved/:id", function (req, res) {
        // Use the article id to find and update its saved boolean
        db.Article.findOneAndUpdate({ "_id": req.params.id }, { "saved": true })
            // Execute the above query
            .then(function (dbArticle) {
                // Log any errors
                res.send(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });

    });

    app.post("/api/articles/delete/:id", function (req, res) {
        // Use the article id to find and update its saved boolean
        db.Article.findOneAndUpdate({ "_id": req.params.id }, { "saved": false })
            // Execute the above query
            .then(function (dbArticle) {
                // Log any errors
                res.send(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });

    });

    app.get("/api/articles/note/:id", function (req, res) {
        // Use the article id to find and update its saved boolean
        db.Article.find({ "_id": req.params.id })
            // Execute the above query
            
            .then(function (dbArticle) {
                
                res.send(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });

    });


    // add note
    app.post("/api/notes/save/:id", function (req, res) {
        // Create a new note and pass the req.body to the entry
        var newNote = new Note({
            body: req.body.text,
            article: req.params.id
        });
        console.log(req.body)
        // And save the new note the db
        newNote.save(function (error, note) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise
            else {
                // Use the article id to find and update it's notes
                db.Article.findOneAndUpdate({ "_id": req.params.id }, { $push: { "notes": note } })
                    // Execute the above query
                    .then(function (err) {
                        // Log any errors
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                        else {
                            // Or send the note to the browser
                            res.send(note);
                        }
                    });
            }
        });
    });
};