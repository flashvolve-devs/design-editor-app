const fs = require('fs');
const { createCanvas, Image, registerFont } = require('canvas');
const initialFrame = require('../functions/initialFrame');
const loadImageUrl = require('../functions/loadImage.js');
const loadText = require('../functions/loadText.js');
const sendToCloud = require('../services/saveInCloud.service.js');


module.exports = class MainController {

    static async home(_req, res) {
        res.send('=== Design Editor ===')
    }
    
    static async createImage(req, res) {
        registerFont('ComicSansMS3.ttf', { family: 'Comic Sans MS' })
        const response = req.body;
        const canvasWidth = response.frame.width;
        const canvasHeight = response.frame.height;

        const canvas = createCanvas(canvasWidth, canvasHeight, 'jpeg');
        const ctx = canvas.getContext('2d');

        const contentJSON = response.content[0] == undefined ? response.scene.layers : response.content[0];

        // console.log(contentJSON);

        for (let i = 0; i < contentJSON.length; i++) {
            //console.log(contentJSON[i]);
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
                    await loadImageUrl(ctx, contentJSON[i], canvasWidth, canvasHeight);
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

        fs.writeFileSync("D:/Flashvolve/design-editor-app/server/app/assets/images/new-image.jpeg", canvas.toBuffer());

        // res.send(base64);

        sendToCloud();

        const IdInCloud = ((await sendToCloud()).id).split('/', 2);

        res.send(`https://storage.googleapis.com/${IdInCloud[0]}/${IdInCloud[1]}`);

        // res.sendFile("D:/Flashvolve/design-editor-app/server/app/assets/images/new-image.jpeg");
    }
}