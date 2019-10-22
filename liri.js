require("dotenv").config();
const keys = require("./keys.js")

const axios = require('axios')
const moment = require('moment')
let Spotify = require('node-spotify-api')
let fs = require("fs");

let spotify = new Spotify(keys.spotify)