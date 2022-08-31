///////////////////////
const fs = require('fs');
const { createCanvas, Image } = require('canvas');
const initialFrame = require('../functions/initialFrame');
const loadImageUrl = require('../functions/loadImage.js');
const loadText = require('../functions/loadText.js');

module.exports = class MainController {

    static async home(req, res) {
        res.send('=== Design Editor ===')
    }
    
    static async createImage(req, res) {
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

        fs.writeFileSync("./images/new-image.jpeg", canvas.toBuffer());

        // res.send(base64);

        res.sendFile("./images/new-image.jpeg", { root: __dirname });

        const FormData = require('form-data');
        const data = new FormData();
        data.append('file', fs.createReadStream('04-zUnrQx/pessoa.jpg'));

        const config = {
            method: 'post',
            url: 'https://storage.googleapis.com/upload/storage/v1/b/flashvolve/o?=multipart&name=s12151.jpeg',
            headers: {
                ...data.getHeaders()
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}