require("dotenv").config();
const keys = require("./keys.js")

const axios = require('axios');
const moment = require('moment');
let Spotify = require("node-spotify-api");
let fs = require("fs");

let spotify = new Spotify(keys.spotify);


let database = process.argv[2]
let search = process.argv.slice(3).join('+')

switch (database){

    case 'movie-this': 
        movie()
        break

    case 'spotify-this-song':
        song()
        break
    
    case 'concert-this':
        concert()
        break

    case 'do-what-it-says':
        text()
        break
}

function movie(){
  if (search === ""){
    console.log('If you haven\'t watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>\nIt\'s on Netflix' )
  } else {
    let movieUrl = 'http://www.omdbapi.com/?apikey=trilogy&t=' +search
          axios({ 
              method: 'GET',
              url: movieUrl,
            })
            .then(function (response) {
              console.log('---------------------')
              console.log('Movie Title: ' + response.data.Title)
              console.log('Year: ' + response.data.Year)
              console.log('ImdbRating: ' + response.data.imdbRating)
              console.log('Metascore: ' + response.data.Metascore)
              console.log('Rotten Tomatoes: ' + response.data.Ratings[1].Value)
              console.log('Country: ' + response.data.Country)
              console.log('Language: ' + response.data.Language)
              console.log('Plot: ' + response.data.Plot)
              console.log('Actors: ' + response.data.Actors)
              console.log('---------------------')
            })
  }            
};
function song(){   
    if (search === "") {
      search = 'the sign ace of base'
    }
    spotify.search({ type: 'track', query: search }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log('-------------------------------')
    console.log('Artist: ' + data.tracks.items[0].artists[0].name + '\n')
    console.log('Song: ' + data.tracks.items[0].name + '\n')
    console.log('Link: ' + data.tracks.items[0].preview_url + '\n')
    console.log('Album: ' + data.tracks.items[0].album.name + '\n')
    console.log('-------------------------------')
  })
};
function concert(){
    let bands = 'https://rest.bandsintown.com/artists/' + search + '/events?app_id=1e140eabdce95250b1ad6075934a113d'

    axios({
        method: 'GET',
        url: bands,
    })
    .then(function(response) {
        for (let i=0; i < response.data.length; i++) {
            console.log(response.data[i].venue.name) 
            console.log(response.data[i].venue.city)
            console.log(moment(response.data[i].datetime).format('MM/DD/YYYY'))
            console.log('-----------------')
        }
    });
};
function text(){
    fs.readFile('random.txt', "utf8", function(err, data){
        if (err) {
            return console.log(err);
        }
    let random = data.split(",");
    console.log(random)
    })
}