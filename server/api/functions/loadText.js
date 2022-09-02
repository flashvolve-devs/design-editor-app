const canvasTxt = require('canvas-txt').default

const loadText = async (ctx, content) => {
  const txt = content.text;

  ctx.fillStyle = content.fill;

  canvasTxt.font = 'Sans';
  canvasTxt.fontSize = content.fontSize;
  canvasTxt.align = content.textAlign;
  canvasTxt.lineHeight = content.fontSize * content.lineHeight;
  canvasTxt.justify = false;
  canvasTxt.drawText(ctx, txt, content.left, content.top - content.fontSize, content.width, content.height); //drawText(ctx, text, x, y, width, height)
};

module.exports = loadText;