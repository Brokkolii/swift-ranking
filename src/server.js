require("dotenv").config();
const config = require("./config");

const { getAlbumIds } = require("./albums");
const { getTracksForAlbums, getSpotifyAccessToken } = require("./spotify");

const express = require("express");
const cors = require("cors");

// Create a new express application instance
const app = express();
app.use(cors(config.cors));
app.use(express.static(config.frontend.path));

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
  console.log(tracks.length);
  res.send(tracks);
});

// redirect everything else to the frontend
app.get("/*", (req, res) => {
  res.sendFile(config.frontend.path + "/" + config.frontend.entry);
});

// Start the server
app.listen(config.port, () => {
  console.log(`Server listening on the port::${config.port}`);
});
