var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

//module export since it is required in server.js

module.exports = function (app) {

    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with axios
        axios.get("http://www.ttnworldwide.com/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            var result = {};
            $("div.tleft").each(function (i, element) {
                // Save an empty result object



                // Add the text and href of every link, and save them as properties of the result object

                result.title = $(this)
                    .children("div.storyblock2").children("div").children("a.fontLinkTitle2")
                    .text();
                result.link = $(this)
                    .children("div.storyblock2").children("div").children("a.fontLinkTitle2")
                    .attr("href");
                result.sumary = $(this)
                    .children("div.storyblock2").children("p.fontcontent")
                    .text();
                result.image = $(this)
                    .children("div.homeimagewrap2").children("img.homeimage2")
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

            // Send a message to the client
            res.send("Scrape is Done!! ");
        });
    });

};