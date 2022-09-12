const { createCanvas, loadIMage } = require('canvas');
const fs = require('fs');
module.exports = class UploadController {


    static async upload (req, res) {
        let data = req.file
        console.log(data)
        res.send('upload controller')
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
}