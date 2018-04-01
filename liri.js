//Variables and requirements for LIRI Bot
var inquirer = require("inquirer");
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

//Calling liriBot function to initialize app
liriBot();

//liriBot function holds switch statement that allows user to pick what they want to do (Tweets, Movie Search, Song Search)
function liriBot(){
    inquirer.prompt({
        type: "list",
        message: "Welcome, I'm LIRI Bot. What would you like to do?",
        choices: ["My Tweets", "Movie This", "Spotify This", "Do what it says", "Exit"],
        name: "command"
    }).then(function(data){
        switch(data.command) {
            case "My Tweets":
                myTweets();
                setTimeout(function(){
                    liriBot();
                }, 3000);
            break;

            case "Movie This":
                inquirer.prompt({
                    type: "input",
                    message: "Search a movie",
                    name: "title"
                }).then(function(data){
                    movieThis(data.title);
                    setTimeout(function(){
                        liriBot();
                    }, 3000);
                })
            break;
            
            case "Spotify This":
                inquirer.prompt({
                    type: "input",
                    message: "Search a song",
                    name: "title"
                }).then(function(data){
                    spotifySong(data.title);
                    setTimeout(function(){
                        liriBot();
                    }, 3000);
                })
            break; 
            
            case "Do what it says":
                doThing();
                setTimeout(function(){
                    liriBot();
                }, 3000);
            break;

            case "Exit":
            console.log("Thanks for using LIRI Bot!");
            setTimeout(function(){
                console.log("Goodbye");
            }, 1500)
            setTimeout(function(){
                console.log("LIRI Bot shutting down...");
            }, 2500)
            setTimeout(function(){
                console.log(".........................");
            }, 3000)
            break;
        }
    })
}


//Function for console logging movie info and appending movie info to log.txt file
function movieThis(movie){
    var title = movie;
    if(title === ''){
        title = "Mr. Nobody"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=" + omdbApi.key;
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
                fs.appendFile("log.txt", "Tweet: " + tweets[i].text + "\r\n" + tweets[i].created_at +  "\r\n" + "----------------------------------------------------------------" + "\r\n", (error) => { /* handle error */ });
            } 
        }
    });
}

//Function for console logging song info and appending song info to log.txt file
function spotifySong(song){
    if(song === ''){
        song = 'The Sign Ace Base';
    }
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
        setTimeout(function(){
            fs.appendFile("log.txt", "----------------------------------------------------------------" + "\r\n", (error) => { /* handle error */ });
        }, 500)
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


