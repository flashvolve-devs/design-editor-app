const fs = require('fs');
const path = require('path');
const sendToCloud = require('../middlewares/saveInCloud.service.js');
const initialFrame = require('../helpers/initialFrame');
const loadImageUrl = require('../helpers/loadImage.js');
const loadText = require('../helpers/loadText.js');
const { createCanvas, Image, registerFont } = require('canvas');
// const Font = require('../models/Fonts');
// const { ObjectId } = require('mongodb');

module.exports = class MainController {

    static async home(_req, res) {
        res.send('=== Design Editor ===');
    }

    static async uploadFonts(req, res, _next) {
        console.log(req.file, req.body);
        res.send('font upload');
    }

    static async createImage(req, res) {
        const response = req.body;
        const canvasWidth = response.frame.width;
        const canvasHeight = response.frame.height;

        registerFont(path.join(__dirname, '../assets/fonts/ComicSansMS3.ttf'), { family: 'Comic Sans MS' })
        const canvas = createCanvas(canvasWidth, canvasHeight, 'jpeg');
        const ctx = canvas.getContext('2d');

        const contentJSON = response.content[0] == undefined ? response.scene.layers : response.content[0];

        for (let i = 0; i < contentJSON.length; i++) {
            const nameMode = contentJSON[i].name;
            switch (nameMode) {
                case 'Initial Frame':
                    await initialFrame(ctx, contentJSON[i]);
                    break;

                case 'StaticPath':
                    break;

                case 'StaticText':
                    await loadText(ctx, contentJSON[i]);
                    break;

                case 'StaticImage':
                    await loadImageUrl(ctx, contentJSON[i]);
                    break;

                 case 'Group':
                     for (let j = 0; j < contentJSON[i].objects.length; j++) {
                        await loadText(ctx, contentJSON[i].objects[j]);
                    }
                    break;

                default:
                    break;
            }
        }

        const base64 = canvas.toDataURL();
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0);
        img.onerror = err => { throw err };
        img.src = base64;

        /* Saving the image to the local file system. */
        fs.writeFileSync(path.join(__dirname, '../assets/images/new-image.jpeg'), canvas.toBuffer());

        sendToCloud();

        const IdInCloud = ((await sendToCloud()).id).split('/', 2);

        res.send(`https://storage.googleapis.com/${IdInCloud[0]}/${IdInCloud[1]}`);

        //res.sendFile(path.join(__dirname, '../assets/images/new-image.jpeg'));
    }
}