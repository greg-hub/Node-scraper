"use strict"

// Import the dependencies
const cheerio = require("cheerio")
    , req = require("tinyreq")
    ;



// Define the scrape function
function scrape(url, data, cb) {
    // 1. Create the request
    req(url, (err, body) => {
        if (err) { return cb(err); }

        // 2. Parse the HTML
        let $ = cheerio.load(body)
          , pageData = {}
          ;

        // 3. Extract the data
        Object.keys(data).forEach(k => {
            pageData[k] = $(data[k]).text();
        });

        // Send the data in the callback
        cb(null, pageData);
    });
}

// Extract the headline from skynews

scrape("http://news.sky.com/", {
    // Get the website title (from the top header)
    title: ".section-header--visually-hidden",
    Breaking:".sky-component-story-grid__headline--breaking"
    // ...and the description
  , description: "p.sky-component-story-grid__intro"
}, (err, data) => {
    console.log(err || data);
});
