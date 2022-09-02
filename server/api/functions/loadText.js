const canvasTxt = require('canvas-txt').default
// const fs = require("fs");

const loadText = async (ctx, content) => {
  // fs.appendFileSync(`${content.fontFamily}.ttf`, '', function (err) {
  // fs.appendFileSync('comicsans.ttf', '', function (err) {
  //   if (err) throw err;
  //   console.log('Updated!');
  // });
  const txt = content.text;

  ctx.fillStyle = content.fill;

  canvasTxt.font = 'Sans';
  canvasTxt.fontSize = content.fontSize;
  canvasTxt.align = content.textAlign;
  // canvasTxt.lineHeight = content.lineHeight;
  canvasTxt.justify = false;
  canvasTxt.drawText(ctx, txt, content.left, content.top, content.width, content.height); //drawText(ctx, text, x, y, width, height)
};

module.exports = loadText;