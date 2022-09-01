// const fs = require("fs");

const loadText = async (ctx, content) => {
  // fs.appendFileSync(`${content.fontFamily}.ttf`, '', function (err) {
  // fs.appendFileSync('comicsans.ttf', '', function (err) {
  //   if (err) throw err;
  //   console.log('Updated!');
  // });

  ctx.font = `${content.fontSize}px Sans`;

  ctx.fillStyle = content.fill;
  
  ctx.textAlign = content.textAlign;
  ctx.fillText(`${content.text}`, content.left * 2, content.top);
  
  // ctx.fillText('Hello World 2', 50, 80); // (string text, position x, position y)
};

module.exports = loadText;