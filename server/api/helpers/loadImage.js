const { loadImage } = require('canvas');
const loadImageUrl = async (ctx, content) => {
  
  const imageUrl = await loadImage(content.src);
  ctx.drawImage(imageUrl, content.left, content.top, content.width * content.scaleX, content.height * content.scaleY);

};

module.exports = loadImageUrl;