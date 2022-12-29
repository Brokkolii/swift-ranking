const { getHeaders } = require("./auth");
const { getDominantColor } = require("./getDominantColor");

const request = require("request");

async function getAlbum(id) {
  const accessToken = await getSpotifyAccessToken();

  const requestData = {
    url: `https://api.spotify.com/v1/albums/${id}`,
    headers: getHeaders(accessToken),
  };

  return new Promise((resolve, reject) => {
    request.get(requestData, (err, res, body) => {
      if (err) {
        return res.status(500).send(err);
      }

      const album = JSON.parse(body);

      getDominantColor(album.images[0].url).then((dominantColor) => {
        album.color = dominantColor;
        resolve(album);
      });
    });
  });
}

async function getTracksForAlbum(id) {
  const accessToken = await getSpotifyAccessToken();

  const requestData = {
    url: `https://api.spotify.com/v1/albums/${id}/tracks`,
    headers: getHeaders(accessToken),
  };

  return new Promise((resolve, reject) => {
    request.get(requestData, (err, res, body) => {
      if (err) {
        return res.status(500).send(err);
      }

      const tracks = JSON.parse(body).items;
      resolve(tracks);
    });
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

module.exports = { getSpotifyAccessToken, getAlbum, getTracksForAlbum };
