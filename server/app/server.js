const encode = require('node-base64-image');
const express = require("express");
const body_parser = require("body-parser");
const app = express().use(body_parser.json());
const { createCanvas, loadImage } = require('canvas');
const initialFrame = require('./functions/initialFrame.js');
const loadImageUrl = require('./functions/loadImage.js');

app.listen(process.env.PORT || 3001, () => console.log("Server running here 👉 http://localhost: 3001"));

app.post("/image", async (req, res) => {

  const response = req.body;

  const canvasWidth = response.frame.width;
  const canvasHeight = response.frame.height;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  const contentImagePerso = response.content[0] == undefined ? response.scene.layers : response.content[0];

  console.log(contentImagePerso);
  
  for(let i = 0; i < contentImagePerso.length; i++){
    //console.log(contentImagePerso[i]);
    const nameMode = contentImagePerso[i].name;
    switch (nameMode) {
      case 'Initial Frame':
        await initialFrame(ctx, contentImagePerso[i]);
        break;

      case 'StaticPath':
        break;

      case 'StaticText':
        break;

      case 'StaticImage':
        await loadImageUrl(ctx, contentImagePerso[i], canvasWidth, canvasHeight);
        break;

      default:
        console.log(nameMode);
        break;
    }
  }
  
  const url = canvas.toDataURL();
  const options = {
    string: true,
    headers: {
      "User-Agent": "my-app"
    }
  };
  
  // writing to a sub-directory
  // after creating a directory called 'photos'
  const image = await encode(url, options);
  
  res.send(image);
});

