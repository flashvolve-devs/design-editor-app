const { loadImage } = require('canvas');
const loadImageUrl = async (ctx, content) => {

  const width = content.width * content.scaleX;
  const heigth = content.height * content.scaleY;

  const imageUrl = await loadImage(content.src);
  ctx.drawImage(imageUrl, content.left, content.top, width, heigth);

};

module.exports = loadImageUrl;