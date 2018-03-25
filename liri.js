require("dotenv").config();
var request = require("request");
var keys = require(__dirname + "/keys.js");
var spotify = (keys.spotify);
var client = (keys.twitter);
var omdbApi = (keys.omdb);
var title = process.argv[3];
var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=" + omdbApi.key;
console.log(queryUrl);


request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {
    if(process.argv[2] === "movie-this"){
        title = "Mr. Nobody";
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        //console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country produced in: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    }
    else if(process.argv[2] === "movie-this"){
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country produced in: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);

    }
  }
});
