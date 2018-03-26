require("dotenv").config();
var request = require("request");
var Twitter = require('twitter');
var keys = require(__dirname + "/keys.js");
// var spotify = (keys.spotify);
var client = new Twitter(keys.twitter);
var omdbApi = (keys.omdb);
var command = process.argv[3];
var queryUrl = "http://www.omdbapi.com/?t=" + command + "&y=&plot=short&apikey=" + omdbApi.key;
var queryUrl2 = "http://www.omdbapi.com/?t=mr%20nobody&y=&plot=short&apikey=" + omdbApi.key;
console.log(client);


if(process.argv[2] === "movie-this" && !process.argv[3]){
    request(queryUrl2, function(error, response, body){
        if (!error && response.statusCode === 200){
            var body = JSON.parse(body);
            console.log("Title: " + body.Title);
            console.log("Year: " + body.Year);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Score: " + body.Ratings[1].Value);
            console.log("Country produced in: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
        }
    })
}
else if(process.argv[2] === "movie-this"){
    request(queryUrl, function(error, response, body){
        if (!error && response.statusCode === 200){
            var body = JSON.parse(body);
            console.log("Title: " + body.Title);
            console.log("Year: " + body.Year);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Score: " + body.Ratings[1].Value);
            console.log("Country produced in: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
        }
    })
}

var params = {screen_name: 'WesHanson16'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});