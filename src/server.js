require('dotenv').config()

const express = require('express');
const app = express()
const port = process.env.PORT || 3080;

app.use(express.static(process.cwd()+"/swift-ranking"));

app.get('/api', (req, res) => {
  res.json({res: "test api"});
});


app.get('/*', (req,res) => {
  res.sendFile(process.cwd()+"/swift-ranking/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});