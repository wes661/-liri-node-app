require("dotenv").config();
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require(__dirname + "/keys.js"); 
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdbApi = (keys.omdb);
var command = process.argv[2];
var title = process.argv[3];



switch(command){
    case "my-tweets":
      myTweets();
    break;
  
    case "spotify-this-song":
      if(title){
        spotifySong(title);
      } else{
        spotifySong('The Sign');
      }
    break;
  
    case "movie-this":
      if(title){
        movieThis(title)
      } else{
        movieThis("Mr. Nobody")
      }
    break;
  
    case "do-what-it-says":
      doThing();
    break;

    default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
    break;
  
  }

function movieThis(movie){
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + omdbApi.key;
    request(queryUrl, function(error, response, body){
        if (!error && response.statusCode === 200){
            var body = JSON.parse(body);
            console.log("----------------------------------------------------------------");
            console.log("Title: " + body.Title);
            console.log("Year: " + body.Year);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Score: " + body.Ratings[1].Value);
            console.log("Country produced in: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("----------------------------------------------------------------");
        }
    })
}

function myTweets(){
    var params = {screen_name: 'WesHanson16',
                  count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++){
                console.log("----------------------------------------------------------------");
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
                console.log("----------------------------------------------------------------");
            } 
              
        }
    });
}

function spotifySong(song){
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        else{ var songInfo = data.tracks.items[0];
            console.log("----------------------------------------------------------------");
            console.log(songInfo.artists[0].name)
            console.log(songInfo.name)
            console.log(songInfo.album.name)
            console.log(songInfo.preview_url)
            console.log("----------------------------------------------------------------");
        }    
    });
}

function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
  
      spotifySong(txt[1]);
    });
}
