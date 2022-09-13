const fs = require('fs');
const path = require('path');
const sendToCloud = require('../middlewares/saveInCloud.middleware');
const initialFrame = require('../helpers/initialFrame');
const loadImageUrl = require('../helpers/loadImage.js');
const loadText = require('../helpers/loadText.js');
const { createCanvas, registerFont, loadIMage } = require('canvas');
const downloadFile = require('../helpers/downloadFont');

module.exports = class UploadController {

    static async upload (_req, res) {
        res.send('/pages/upload')
    }

    static async template (req, res) {
        let width =  1200
        let height = 580
        const canvas = createCanvas(width, height)
        const context = canvas.getContext('2d')
        context.fillStyle = '#000'
        context.fillRect(0, 0, width, height)
        context.font = 'bold 80px Gill Sans'
        context.textAlign = 'center'
        context.textBaseline = 'top'
        context.fillStyle = '#0788eb'//cor
        const text = req.body.textimage
        const subText = 'flashvolve.com'//req.body.subTitle
        const textWidth = context.measureText(text).width
        context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
        context.fillStyle = '#fff'//cor da fonte
        context.fillText(text, 600, 170)
        //context.fillStyle = '#fff'
        context.font = 'bold 30pt Gill Sans'
        context.fillText(subText, 600, 368)//posição do texto
        const buffer = canvas.toBuffer('image/png')
        //fs.writeFileSync('./output.png', buffer)
        fs.writeFileSync('./public/images/output.png', buffer)

        res.render('pages/upload')
    }
    
        static async downloadFonts(contentJSON) {
        for (let i = 0; i < contentJSON.length; i++) {
            const nameMode = contentJSON[i].name;

            if (nameMode === 'StaticText') {

                const fontUrl = contentJSON[i].fontURL;
                const fontName = (contentJSON[i].fontFamily);
                const pathFile = path.join(__dirname, `../assets/fonts/${fontName}.ttf`);

                await downloadFile(fontUrl, pathFile);

                registerFont(path.join(__dirname, `../assets/fonts/${fontName}.ttf`),
                    { family: contentJSON[i].fontFamily });
            }

            if (nameMode === 'Group') {
                for (let j = 0; j < contentJSON[i].objects.length; j++) {

                    const fontUrl = contentJSON[i].objects[j].fontURL;
                    const fontName = (contentJSON[i].objects[j].fontFamily);
                    const pathFile = path.join(__dirname, `../assets/fonts/${fontName}.ttf`);

                    await downloadFile(fontUrl, pathFile);

                    registerFont(path.join(__dirname, `../assets/fonts/${fontName}.ttf`),
                        { family: contentJSON[i].objects[j].fontFamily });
                }
            }
        }
    }

    static async createImage(req, res) {
        const data = req.body;
        console.log(data)
        const canvasWidth = data.frame.width;
        const canvasHeight = data.frame.height;

        const contentJSON = data.content == undefined ? data.layers : data.content[0];

        await UploadController.downloadFonts(contentJSON
            .filter(item => item.name == 'StaticText' || item.name == 'Group')
        ); //call method downloadFonts

        const canvas = createCanvas(canvasWidth, canvasHeight, 'jpeg'); //create canvas
        const ctx = canvas.getContext('2d');


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

        /* Saving the image to the local file system. */
        fs.writeFileSync(path.join(__dirname, '../assets/images/upload-image.jpeg'), canvas.toBuffer());

        sendToCloud();

        const IdInCloud = ((await sendToCloud('upload')).id).split('/', 2);

        res.send(`https://storage.googleapis.com/${IdInCloud[0]}/${IdInCloud[1]}`);
  }
}