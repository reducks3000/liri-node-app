require("dotenv").config();
const keys = require("./keys.js")

const axios = require('axios')
const moment = require('moment')
let Spotify = require('node-spotify-api')
let fs = require("fs");

let spotify = new Spotify(keys.spotify)


let database = process.argv[2]
let search = process.argv.slice(3).join('+')

switch (database){

   case 'movie-this': 
    movie()
    break
}

function movie(){
  if (search === ""){
    console.log('If you haven\'t watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>\nIt\'s on Netflix' )
  } else {
    let movieUrl = 'http://www.omdbapi.com/?apikey=trilogy&t=' +search
          axios({ 
              method: 'get',
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
}
    
    switch (database){
    
       case 'movie-this': 
        movie()
        break

    }