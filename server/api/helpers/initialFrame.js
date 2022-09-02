const initialFrame = async (ctx, content) => {
  
  ctx.fillStyle = content.fill;
  ctx.fillRect(content.left, content.top, content.width, content.height);

};

module.exports = initialFrame;