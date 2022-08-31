// const fs = require("fs");

const loadText = async (ctx, content) => {
  // fs.appendFileSync(`${content.fontFamily}.ttf`, '', function (err) {
  // fs.appendFileSync('comicsans.ttf', '', function (err) {
  //   if (err) throw err;
  //   console.log('Updated!');
  // });
  
  //console.log(content);
  // registerFont(`${content.fontFamily}.ttf`, { family: content.fontFamily });
  // registerFont('comicsans.ttf', { family: 'Comic Sans' })

  // ctx.font = `${content.fontSize}px ${content.fontFamily}`;
  ctx.font = '12px Comic Sans MS';
  // ctx.font = '22px Helvetica'
  // console.log(content.text);
  // console.log(content.weight);
  // console.log(content.heigth);

  // ctx.fillText(`${content.text}(`, content.weight, content.heigth);
  ctx.fillText('Hello World 2', 50, 80);

};

module.exports = loadText;