var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

//module export since it is required in server.js

module.exports = function (app) {

    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with axios
        axios.get("https://www.popularmechanics.com/technology/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            var result = {};
            $("div.full-item").each(function (i, element) {
            
                // Save an empty result object
                // Add the text and href of every link, and save them as properties of the result object

                result.title = $(this)
                    .children("div.full-item-content").children("a.full-item-title")
                    .text();
                result.link = $(this)
                    .children("div.full-item-content").children("a.full-item-title")
                    .attr("href");
                result.sumary = $(this)
                    .children("div.full-item-content").children("div.full-item-dek").children("p")
                    .text();
                result.image = $(this)
                    .children("a.full-item-image").children("img.lazyimage")
                    .attr("src")

                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });

            });

            res.send("Scrape Complete");
           
        });
    });
};