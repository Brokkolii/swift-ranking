require("dotenv").config();

const request = require("request");

async function getOpinionForSong(artist, song) {
  const prompt = `The User of an app just choose the song "${song}" by ${artist}. Say something about the song in one or two sentences and complement the choice.`;

  const chatgptRequestData = {
    url: `https://api.openai.com/v1/completions`,
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 100,
      model: "text-davinci-003",
      temperature: 0.2,
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
