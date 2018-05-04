require("dotenv").config();

// grabbing keys for Twitter and Spotify APIs
var keys = require("./keys.js");

// imports NPM packages
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs'); // file system node package (read & write files)

// creating Spotify object to use Spotify API
var spotify = new Spotify(keys.spotify);

// creating Twitter object to use Twitter API
var twitter = new Twitter(keys.twitter);

//catching the 3rd argument in the array from the command line [node, file name, 3rd argument in the array]
var command = process.argv[2];
//catching the 4th argument in the array from the command line [node, file name, 3rd, argument, 4th argument in the array]
var search = process.argv[3];

var myTweets = function(){
    // This will show your last 20 tweets and when they were created at in your terminal/bash window.
    twitter.get("statuses/home_timeline", function(error, tweets, response) {
        if(error) throw error;
    
        // loop over array of tweets
        for(var i = 0; i < tweets.length; i++) {
            // grab tweet at index i
            var tweet = tweets[i];

            var user = tweet.user.name;
            var date = tweet.created_at;
            var text = tweet.text;

            console.log("===================================");
            console.log("User", user);
            console.log("Date:", date);
            console.log("Text:", text);
            
        }
        // console.log(tweets);   // user tweets
        // console.log(response);  // Raw response object. 
      });
};
var spotifyThisSong = function(){
// This will show the following information about the song in your terminal/bash window
//  Artist(s)
//  The song's name
//  A preview link of the song from Spotify
//  The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.
// TODO: check if search was provided. if not, set search = 'The Sign'.

    spotify.search({ type: 'track', query: search }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
    
        console.log("Spotify data:",data); 
    });
};
var movieThis = function(){
//     This will output the following information to your terminal/bash window:

//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.

// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

// TODO: check if search was provided. if not, set search = 'Mr.Nobody'.

request('http://www.omdbapi.com/?apikey=trilogy&t=' + search, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
};
var doWhatItSays = function(){
//     Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.
};

// checks the command line argument and run the corresponding function
var runCommand = function(){
    if (command === "my-tweets"){
        myTweets();
    }
    else if (command === "spotify-this-song"){
        spotifyThisSong();
    }
    else if (command === "movie-this"){
        movieThis();
    }
    else if (command === "do-what-it-says"){
        doWhatItSays();
    }
    else {
        console.log("Invalid command. Please try again.")
    }
};

runCommand();