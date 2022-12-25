require('dotenv').config()

const express = require('express');
const app = express()

app.use(express.static(process.cwd()+"/frontend/dist/swift-ranking/"));

app.get('/api', (req, res) => {
  res.json({res: "test api"});
});


app.get('/*', (req,res) => {
  res.sendFile(process.cwd()+"/frontend/dist/swift-ranking/index.html")
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on the port::${process.env.PORT}`);
});