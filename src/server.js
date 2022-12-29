const config = require("./config");
const { getDominantColor } = require("./getDominantColor");
const { getSpotifyHeaders } = require("./auth");
const { getAlbumIds, getTracksFromAlbums } = require("./albums");
const { getAlbum } = require("./spotify");

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
  const albumIds = getAlbumIds();
  const albums = [];

  for (const id of albumIds) {
    const album = await getAlbum(id);
    albums.push(album);
  }

  if (albums.length === albumIds.length) {
    const tracks = await getTracksFromAlbums(albums);
    res.send(tracks);
  }
});

// redirect everything else to the frontend
app.get("/*", (req, res) => {
  res.sendFile(config.frontend.path + "/" + config.frontend.entry);
});

// Start the server
app.listen(config.port, () => {
  console.log(`Server listening on the port::${config.port}`);
});
