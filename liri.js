require("dotenv").config();
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require(__dirname + "/keys.js"); 
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdbApi = (keys.omdb);
var command = process.argv[2];
var title = process.argv[3];
var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=" + omdbApi.key;
var queryUrl2 = "http://www.omdbapi.com/?t=mr%20nobody&y=&plot=short&apikey=" + omdbApi.key;



if(command === "movie-this" && !title){
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
else if(command === "movie-this"){
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

if(command === "my-tweets"){
    var params = {screen_name: 'WesHanson16'};
    client.get('statuses/user_timeline', params, function(error, tweets, body, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++){
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }    
        }
    });
}
if(command === "spotify-this-song" && !title){
    spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        else{ var songInfo = data.tracks.items[0];
            console.log(songInfo.artists[0].name)
            console.log(songInfo.name)
            console.log(songInfo.album.name)
            console.log(songInfo.preview_url)
        }    
    });
}
else if(command === "spotify-this-song"){
    spotify.search({ type: 'track', query: title }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        else{ var songInfo = data.tracks.items[0];
            console.log(songInfo.artists[0].name)
            console.log(songInfo.name)
            console.log(songInfo.album.name)
            console.log(songInfo.preview_url)
        }    
    });
}