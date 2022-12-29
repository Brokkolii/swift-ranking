module.exports = {
  port: process.env.PORT || 3080,
  cors: {
    //origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  },
  frontend: {
    path: process.cwd() + "/frontend/dist/swift-ranking",
    entry: "index.html",
  },
};
