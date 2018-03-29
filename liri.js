//Variables and requirements for LIRI Bot
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


//Switch function to call different functions based on user input
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
    //Default log if none of the switch commands were entered
    //Log explains how to use LIRI Bot
    console.log("LIRI Bot at your service.");
    console.log("Enter Command: my-tweets (will return recent tweets)");
    console.log("Enter Command: movie-this and title of movie in quotes (returns various info about movie)");
    console.log("Enter Command: spotify-this-song and title of song in quotes (returns various info about song)");
    console.log("Enter Command: do-what-it-says (will return song info from the file where it was read)");
    break;
  
  }

//Function for console logging movie info and appending movie info to log.txt file
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

//Function for console logging tweets and appending tweets to log.txt file
function myTweets(){
    var params = {screen_name: 'WesHanson16',
                  count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++){
                console.log("Tweet: " + tweets[i].text);
                console.log("Date: " + tweets[i].created_at);
                console.log("----------------------------------------------------------------");
                fs.appendFile("log.txt", "Tweet: " + tweets[i].text + "\r\n" + tweets[i].created_at +  "\r\n" +  "\r\n", (error) => { /* handle error */ });
            } 
        }
    });
}

//Function for console logging song info and appending song info to log.txt file
function spotifySong(song){
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        else{ var songInfo = data.tracks.items[0];
            console.log("Artist: " + songInfo.artists[0].name)
            console.log("Track: " + songInfo.name)
            console.log("Album: " + songInfo.album.name)
            console.log("Preview: " + songInfo.preview_url)
            console.log("----------------------------------------------------------------");
            fs.appendFile("log.txt", "Artist: " + songInfo.artists[0].name + "\r\n", (error) => { /* handle error */ })
            fs.appendFile("log.txt", "Track: " + songInfo.name + "\r\n", (error) => { /* handle error */ })
            fs.appendFile("log.txt", "Album: " + songInfo.album.name + "\r\n", (error) => { /* handle error */ })
            fs.appendFile("log.txt", "Preview: " + songInfo.preview_url + "\r\n", (error) => { /* handle error */ })
            fs.appendFile("log.txt", "----------------------------------------------------------------" + "\r\n", (error) => { /* handle error */ });
        }    
    });
}

//Function for reading random.txt file then running the spotifySong function to console log song info and append song info to log.txt file
function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){
      //Split the data that is read in random.txt file with commas  
      var txt = data.split(',');
     //Run function with the parameters of (txt) as the command and [1] as the value from random.txt
      spotifySong(txt[1]);
    });
}
