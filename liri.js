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
            console.log("Title: " + body.Title);
            console.log("Year: " + body.Year);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Score: " + body.Ratings[1].Value);
            console.log("Country produced in: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            fs.appendFile("log.txt", "Title: " + body.Title + "\r\n", (error) => { /* handle error */ });
            fs.appendFile("log.txt", "Year: " + body.Year + "\r\n", (error) => { /* handle error */ });
            fs.appendFile("log.txt", "IMDB Rating: " + body.imdbRating + "\r\n", (error) => { /* handle error */ });
            fs.appendFile("log.txt", "Rotten Tomatoes Score: " + body.Ratings[1].Value + "\r\n", (error) => { /* handle error */ });
            fs.appendFile("log.txt", "Country produced in: " + body.Country + "\r\n", (error) => { /* handle error */ });
            fs.appendFile("log.txt", "Language: " + body.Language + "\r\n", (error) => { /* handle error */ });
            fs.appendFile("log.txt", "Plot: " + body.Plot + "\r\n", (error) => { /* handle error */ });
            fs.appendFile("log.txt", "Actors: " + body.Actors + "\r\n", (error) => { /* handle error */ });
            if(movie === "Mr. Nobody"){
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");
                fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\r\n", (error) => { /* handle error */ });
                fs.appendFile('log.txt', "It's on Netflix!" + "\r\n", (error) => { /* handle error */ });
            }
            console.log("----------------------------------------------------------------");
            fs.appendFile("log.txt", "----------------------------------------------------------------" + "\r\n", (error) => { /* handle error */ });
        }
    });
}

function myTweets(){
    var params = {screen_name: 'WesHanson16',
                  count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++){
                console.log("Tweet: " + tweets[i].text);
                console.log("Date " + tweets[i].created_at);
                console.log("----------------------------------------------------------------");
                fs.appendFile("log.txt", "Tweet: " + tweets[i].text + "\r\n", (error) => { /* handle error */ });
                fs.appendFile("log.txt", "Date " + tweets[i].created_at + "\r\n", (error) => { /* handle error */ });
                fs.appendFile("log.txt", "----------------------------------------------------------------" + "\r\n", (error) => { /* handle error */ });
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
            console.log("Artist: " + songInfo.artists[0].name)
            console.log("Track: " + songInfo.name)
            console.log("Album: " + songInfo.album.name)
            console.log("Preview " + songInfo.preview_url)
            console.log("----------------------------------------------------------------");
            fs.appendFile("log.txt", songInfo.artists[0].name + "\r\n", (error) => { /* handle error */ })
            fs.appendFile("log.txt", songInfo.name + "\r\n", (error) => { /* handle error */ })
            fs.appendFile("log.txt", songInfo.album.name + "\r\n", (error) => { /* handle error */ })
            fs.appendFile("log.txt", songInfo.preview_url + "\r\n", (error) => { /* handle error */ })
            fs.appendFile("log.txt", "----------------------------------------------------------------" + "\r\n", (error) => { /* handle error */ });
        }    
    });
}

function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
  
      spotifySong(txt[1]);
    });
}
