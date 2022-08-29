const { createCanvas, loadImage } = require('canvas');

const loadImageUrl = async (ctx, content, canvasWidth, canvasHeight) => {
  
  //console.log(content);
  const imageUrl = await loadImage(content.src);
  ctx.drawImage(imageUrl, content.top, content.left, content.width * content.scaleX, content.height * content.scaleY);

};

module.exports = loadImageUrl;