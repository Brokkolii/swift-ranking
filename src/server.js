require("dotenv").config();
const config = require("./config");

const { getAlbumIds } = require("./albums");
const { getTracksForAlbums, getSpotifyAccessToken, getAlbums } = require("./spotify");
const { getOpinionForSong, listModels } = require("./openai");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create a new express application instance
const app = express();
app.use(bodyParser.json());
app.use(cors(config.cors));
app.use(express.static(config.frontend.path));

/*******************
 * Endpoints
 * *************** */

// ready check
app.get("/api/ready", (req, res) => {
  res.json({ ready: true });
});

// health check
app.get("/api/health", (req, res) => {
  res.json({ health: true });
});

// songs endpoint
app.get("/api/songs", async (req, res) => {
  const accessToken = await getSpotifyAccessToken();
  const albumIds = getAlbumIds();
  const tracks = await getTracksForAlbums(albumIds, accessToken);
  res.send(tracks);
});

// albumSongs endpoint
app.get("/api/albumSongs/:albumId", async (req, res) => {
  const accessToken = await getSpotifyAccessToken();
  const tracks = await getTracksForAlbums([albumid], accessToken);
  res.send(tracks);
});

// albums endpoint
app.get("/api/albums", async (req, res) => {
  const accessToken = await getSpotifyAccessToken();
  const albumIds = getAlbumIds();
  const albums = await getAlbums(albumIds, accessToken);
  res.send(albums);
});

// opinion endpoint
app.post("/api/opinion", async (req, res) => {
  const { artist, song } = req.body;
  const opinion = await getOpinionForSong(artist, song);
  res.send(opinion);
});

// redirect everything else to the frontend
app.get("/*", (req, res) => {
  res.sendFile(config.frontend.path + "/" + config.frontend.entry);
});

// Start the server
app.listen(config.port, () => {
  console.log(`Server listening on the port::${config.port}`);
});
