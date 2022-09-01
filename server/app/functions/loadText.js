// const fs = require("fs");

const loadText = async (ctx, content) => {
  // fs.appendFileSync(`${content.fontFamily}.ttf`, '', function (err) {
  // fs.appendFileSync('comicsans.ttf', '', function (err) {
  //   if (err) throw err;
  //   console.log('Updated!');
  // });
  
  console.log(content);
  
  // registerFont(`${content.fontFamily}.ttf`, { family: content.fontFamily });
  // registerFont('comicsans.ttf', { family: 'Comic Sans' })

  // ctx.font = '80px Comic Sans';
  ctx.font = `${content.fontSize}px Comic Sans`;
  ctx.fillStyle = content.fill
  console.log(content.text);
  console.log(content.weight);
  console.log(content.heigth);
  
  // ctx.fillText('Hello World 2', 50, 80); // (string text, position x, position y)
  ctx.textAlign = content.textAlign;
  ctx.fillText(`${content.text}`, content.left, content.top);
};

module.exports = loadText;