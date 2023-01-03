require("dotenv").config();
const { getHeaders } = require("./auth");
const { getDominantColor } = require("./getDominantColor");

const request = require("request");

async function getTracksForAlbums(albumIds, accessToken) {
  const tracks = [];
  let albumsReceived = 0;

  return new Promise((resolve, reject) => {
    for (i in albumIds) {
      const albumRequestData = {
        url: `https://api.spotify.com/v1/albums/${albumIds[i]}`,
        headers: getHeaders(accessToken),
      };

      request.get(albumRequestData, (err, res, body) => {
        if (err) {
          return res.status(500).send(err);
        }

        const album = JSON.parse(body);

        getDominantColor(album.images[0].url).then((dominantColor) => {
          album.color = dominantColor;

          const tracksRequestData = {
            url: `https://api.spotify.com/v1/albums/${album.id}/tracks`,
            headers: getHeaders(accessToken),
          };

          request.get(tracksRequestData, (err, res, body) => {
            if (err) {
              return res.status(500).send(err);
            }

            const albumTracks = JSON.parse(body).items;

            for (let j in albumTracks) {
              const track = albumTracks[j];
              track.album = album;
              tracks.push(track);
            }
            albumsReceived++;
            if (albumsReceived === albumIds.length) resolve(tracks);
          });
        });
      });
    }
  });
}

async function getAlbums(albumIds, accessToken) {
  const albums = [];
  let albumsReceived = 0;

  return new Promise((resolve, reject) => {
    for (i in albumIds) {
      const albumRequestData = {
        url: `https://api.spotify.com/v1/albums/${albumIds[i]}`,
        headers: getHeaders(accessToken),
      };

      request.get(albumRequestData, (err, res, body) => {
        if (err) {
          return res.status(500).send(err);
        }

        const album = JSON.parse(body);

        getDominantColor(album.images[0].url).then((dominantColor) => {
          album.color = dominantColor;
          albums.push(album);
          albumsReceived++;
          if (albumsReceived === albumIds.length) resolve(albums);
        });
      });
    }
  });
}

async function getSpotifyAccessToken() {
  const requestData = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      grant_type: "client_credentials",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    },
  };

  return new Promise((resolve, reject) => {
    request.post(requestData, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      const accessToken = JSON.parse(body).access_token;
      if (accessToken) {
        resolve(accessToken);
      } else {
        reject("error getting access token");
      }
    });
  });
}

module.exports = { getSpotifyAccessToken, getTracksForAlbums, getAlbums };
