const { createCanvas, loadImage } = require("canvas");

async function getDominantColor(src) {
  const canvas = createCanvas(200, 200);
  const context = canvas.getContext("2d");
  let dominantColor;
  await loadImage(src).then((image) => {
    context.drawImage(image, 50, 0, 70, 70);

    const imageData = context.getImageData(0, 0, image.width, image.height);
    const data = imageData.data;
    let colorCounts = {};
    let dominantCount = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a > 128) {
        // only count pixels that are not fully transparent
        if ((r + g + b) / 3 < 180 && (r + g + b) / 3 > 120) {
          // only count pixels if they are not too dark or too light
          const key = `${r},${g},${b}`;
          if (colorCounts[key]) {
            colorCounts[key]++;
          } else {
            colorCounts[key] = 1;
          }
          if (colorCounts[key] > dominantCount) {
            dominantCount = colorCounts[key];
            dominantColor = { r: r, g: g, b: b };
          }
        }
      }
    }
  });
  return dominantColor;
}

module.exports = { getDominantColor };
