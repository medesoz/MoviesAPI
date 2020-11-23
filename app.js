var express = require("express");
var request = require("request");

var app = express();
var port = 80;

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/movies", function (req, res) {
    var query = req.query.search;
    var url = "https://www.omdbapi.com/?s=" + query + "&apikey=6aa434e";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("result", {data:data});
        }
    })
});

app.listen(port, function(){
    console.log("movie API loaded up!");
    console.log("on port: " + port);
});