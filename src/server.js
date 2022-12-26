require('dotenv').config()
const fs = require('fs')
const http = require('http');
const request = require('request');


const express = require('express');
const app = express()
const port = process.env.PORT || 3080;

const cors = require('cors');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.use(express.static(process.cwd()+"/frontend/dist/swift-ranking"));

app.get('/api/ready', (req, res) => {
  res.json({ready: true}); 
});
 
app.get('/api/songs', (req, res) => {

  // Replace {client_id} and {client_secret} with your Spotify API client ID and secret
  const authData = {
    grant_type: 'client_credentials',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET
  };

  // Use the Spotify API's /api/token endpoint to get an access token
  request.post({
    url: 'https://accounts.spotify.com/api/token',
    form: authData
  }, (err, response, body) => {
    if (err) {
      return res.status(500).send(err);
    }

    const accessToken = JSON.parse(body).access_token;

    // Set the authorization header of the request to include the access token
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

      const albums = [
        {
          "id": "5eyZZoQEFQWRHkV2xgAeBw",
          "name": "Taylor Swift"
        },
        {
          "id": "4hDok0OAJd57SGIT8xuWJH",
          "name": "Fearless (Taylor's Version)"
        },
        {
          "id": "6Ar2o9KCqcyYF9J0aQP3au",
          "name": "Speak Now"
        },
        {
          "id": "6kZ42qRrzov54LcAk4onW9",
          "name": "Red (Taylor's Version)"
        },
        {
          "id": "5fy0X0JmZRZnVa2UEicIOl",
          "name": "1989"
        },
        {
          "id": "6DEjYFkNZh67HP7R9PSZvv",
          "name": "Reputation"
        },
        {
          "id": "1NAmidJlEaVgA3MpcPFYGq",
          "name": "Lover"
        },
        {
          "id": "2fenSS68JI1h4Fo296JfGr",
          "name": "Folklore"
        },{
          "id": "2Xoteh7uEpea4TohMxjtaq",
          "name": "Evermore" // right where you left me is missing on this one (deluxe?)
        },
        {
          "id": "3lS1y25WAhcqJDATJK70Mq",
          "name": "Midnights (3am Edition)"
        },
      ]; 
      // Handpicked albums to avoid duplicates
      // Full list:
      /*
      [
        'Midnights (3am Edition) (3lS1y25WAhcqJDATJK70Mq)',
        'Midnights (3am Edition) (4894htPwC6zoiuTqUQwn4I)',
        'Midnights (151w1FgRZfnKZA9FEcg9Z3)',
        'Midnights (4moVP48t9bji7djUc5VOvi)',
        "Red (Taylor's Version) (6kZ42qRrzov54LcAk4onW9)",
        "Red (Taylor's Version) (6x9s2ObPdpATZgrwxsk9c0)",
        "Fearless (Taylor's Version) (4hDok0OAJd57SGIT8xuWJH)",
        'evermore (deluxe version) (6AORtDjduMM3bupSWzbTSG)',
        'evermore (deluxe version) (1DT6fDJL6AWPJxe7Lq1dPb)',
        'evermore (2Xoteh7uEpea4TohMxjtaq)',
        'evermore (5jmVg7rwRcgd6ARPAeYNSm)',
        'folklore: the long pond studio sessions (from the Disney+ special) [deluxe edition] (0PZ7lAru5FDFHuirTkWe9Z)',
        'folklore: the long pond studio sessions (from the Disney+ special) [deluxe edition] (3VaaZ7OIbGLi60NVsnueoo)',
        'folklore (deluxe version) (1pzvBxYgT6OVwJLtHkrdQK)',
        'folklore (deluxe version) (7v7pe5vZQPWB5zW0JrKRiw)',
        'folklore (2fenSS68JI1h4Fo296JfGr)',
        'folklore (0xS0iOtxQRoJvfcFcJA5Gv)',
        'Lover (1NAmidJlEaVgA3MpcPFYGq)',
        'Taylor Swift Karaoke: reputation (1MHuZZrGT36cXLxAQ5cLP3)',
        'reputation (6DEjYFkNZh67HP7R9PSZvv)',
        'reputation (Big Machine Radio Release Special) (1Hrs3jLGexOvBoaPMoOQYJ)',
        'reputation Stadium Tour Surprise Song Playlist (1MPAXuTVL2Ej5x0JHiSPq8)',
        'Taylor Swift Karaoke: 1989 (Deluxe) (0bEySlRAkuPxV9KVWhXXBr)',
        '1989 (Big Machine Radio Release Special) (6EsTJnpahwW6xX20zvqQgZ)',
        '1989 (5fy0X0JmZRZnVa2UEicIOl)',
        '1989 (Deluxe) (1yGbNOtRIgdIiGHOEBaZWf)',
        'Red (Deluxe Edition) (1KVKqWeRuXsJDLTW0VuD29)',
        'Red (Big Machine Radio Release Special) (4jTYApZPMapg56gRycOn0D)',
        'Red (7daMnnffzVSbNJj8Dy75Ev)',
        'Speak Now World Tour Live (6fyR4wBPwLHKcRtxgd4sGh)',
        'Speak Now (6Ar2o9KCqcyYF9J0aQP3au)',
        'Speak Now (Big Machine Radio Release Special) (75N0Z60SNMQbAPYZuxKgWd)',
        'Speak Now (Karaoke Version) (3QXlUpSDgakWZK2WqQv0pF)',
        'Speak Now (Deluxe Package) (6S6JQWzUrJVcJLK4fi74Fw)',
        'Fearless (6tgMb6LEwb3yj7BdYy462y)',
        'Fearless (International Version) (08CWGiv27MVQhYpuTtvx83)',
        'Fearless (Big Machine Radio Release Special) (3EzFY9Rg0PpbADMth746zi)',
        'Fearless (Karaoke Version) (1CYlmaXajTC59VJWSSeE7Y)',
        'Fearless (Platinum Edition) (2gP2LMVcIFgVczSJqn340t)',
        'Live From Clear Channel Stripped 2008 (1ycoesYxIFymXWebfmz828)',
        'Taylor Swift (5eyZZoQEFQWRHkV2xgAeBw)',
        'Taylor Swift (Big Machine Radio Release Special) (2rU7u7C2v5i45MFVxx7xG1)',
        'Taylor Swift (Karaoke Version) (1mFGeuBwVfAyli6aDoy9OI)'
      ]
      */

      // Make a GET request to the /albums/{id}/tracks endpoint for each album to get a list of tracks on the album
      const tracks = [];
      let albumRecieved = 0;
      albums.forEach((album) => {
        request.get({
          url: `https://api.spotify.com/v1/albums/${album.id}/tracks`,
          headers: headers
        }, (err, response, body) => {
          if (err) {
            return res.status(500).send(err);
          }
          let newTracks = JSON.parse(body).items;
          newTracks.map((track) => {
            track.album = album;
            return track;
          })
          tracks.push(...newTracks);
          albumRecieved++;

          // When all the tracks have been retrieved, send the list of tracks back to the client
          if (albumRecieved >= albums.length) {
            res.send(tracks);
          }
        });
      });
  });
});

app.get('/*', (req,res) => {
  res.sendFile(process.cwd()+"/frontend/dist/swift-ranking/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});