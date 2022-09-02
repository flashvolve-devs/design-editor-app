const { createCanvas, Image, registerFont } = require('canvas');
const sendToCloud = require('../services/saveInCloud.service.js');
const initialFrame = require('../functions/initialFrame');
const loadImageUrl = require('../functions/loadImage.js');
const loadText = require('../functions/loadText.js');
const upload = require('../functions/configMulter');
const Font = require('../models/Fonts');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { request } = require('http');

module.exports = class MainController {

    static async home(req, res) {
        res.send('=== Design Editor ===')
    }

    static async uploadFonts(req, res, next) {
        console.log(req.file, req.body)
        res.send('font upload')
    }

    static async createImage(req, res) {
        // registerFont('ComicSansMS3.ttf', { family: 'Comic Sans MS' })
        const response = req.body;
        console.log(response)
        const canvasWidth = response.frame.width;
        const canvasHeight = response.frame.height;

        //const font = new Font()

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

        fs.writeFileSync(path.join(__dirname, '../assets/images/new-image.jpeg'), canvas.toBuffer());

        sendToCloud();

        const IdInCloud = ((await sendToCloud()).id).split('/', 2);

        res.send(`https://storage.googleapis.com/${IdInCloud[0]}/${IdInCloud[1]}`);

        //res.sendFile(path.join(__dirname, '../assets/images/new-image.jpeg'));

    }
}