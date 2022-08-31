const fs = require("fs");

// const { registerFont } = require('canvas');

const loadText = async (ctx, content) => {
  // fs.appendFileSync(`${content.fontFamily}.ttf`, '', function (err) {
  fs.appendFileSync('comicsans.ttf', '', function (err) {
    if (err) throw err;
    console.log('Updated!');
  });
  
  //console.log(content);
  // registerFont(`${content.fontFamily}.ttf`, { family: content.fontFamily });
  // registerFont('comicsans.ttf', { family: 'Comic Sans' })

  ctx.font = `${content.fontSize}px ${content.fontFamily}`;
  ctx.fillText(`${content.text}(`, content.weight, content.heigth);

};

module.exports = loadText;