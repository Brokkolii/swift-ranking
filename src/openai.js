require("dotenv").config();

const request = require("request");

async function getOpinionForSong(artist, song) {
  const prompt = `Greet the fan of ${artist} and then tell them something about their favourite song: '${song}'. Call the fan by the typical name of a fan of ${artist}.`;

  const chatgptRequestData = {
    url: `https://api.openai.com/v1/completions`,
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 50,
      model: "text-davinci-003",
      temperature: 0.5,
    }),
  };

  return new Promise((resolve, reject) => {
    request.post(chatgptRequestData, (err, res, body) => {
      const response = JSON.parse(body);
      resolve(response.choices[0].text);
    });
  });
}

module.exports = { getOpinionForSong };
