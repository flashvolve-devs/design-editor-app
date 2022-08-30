const fs = require("fs");
const express = require("express");
const body_parser = require("body-parser");
const app = express().use(body_parser.json());
const { createCanvas, Image } = require('canvas');
const initialFrame = require('./functions/initialFrame.js');
const loadImageUrl = require('./functions/loadImage.js');

app.listen(process.env.PORT || 3001, () => console.log("Server running here 👉 http://localhost: 3001"));

app.post("/image", async (req, res) => {

  const response = req.body;

  const canvasWidth = response.frame.width;
  const canvasHeight = response.frame.height;

  const canvas = createCanvas(canvasWidth, canvasHeight, 'jpeg');
  const ctx = canvas.getContext('2d');

  const contentImage = response.content[0] == undefined ? response.scene.layers : response.content[0];

  // console.log(contentImage);
  
  for(let i = 0; i < contentImage.length; i++){
    //console.log(contentImage[i]);
    const nameMode = contentImage[i].name;
    switch (nameMode) {
      case 'Initial Frame':
        await initialFrame(ctx, contentImage[i]);
        break;

      case 'StaticPath':
        break;

      case 'StaticText':
        break;

      case 'StaticImage':
        await loadImageUrl(ctx, contentImage[i], canvasWidth, canvasHeight);
        break;

      default:
        // console.log(nameMode);
        break;
    }
  }
  
  const base64 = canvas.toDataURL();
  const img = new Image();
  img.onload = () => ctx.drawImage(img, 0, 0)
  img.onerror = err => { throw err }
  img.src = base64;

  fs.writeFileSync("./images/new-image.jpeg", canvas.toBuffer());

  // res.send(base64);

  res.sendFile("./images/new-image.jpeg", { root: __dirname });
});