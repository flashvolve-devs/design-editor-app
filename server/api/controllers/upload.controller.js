const fs = require('fs');
const path = require('path');
const sendToCloud = require('../middlewares/saveInCloud.middleware');

module.exports = class MainController {

    static async createImage(req, res) {
        const data = req.body;
        console.log(data)

        /* Saving the image to the local file system. */
        fs.writeFileSync(path.join(__dirname, '../assets/images/templ-image.jpeg'), canvas.toBuffer());

        sendToCloud();

        const IdInCloud = ((await sendToCloud()).id).split('/', 2);

        res.send(`https://storage.googleapis.com/${IdInCloud[0]}/${IdInCloud[1]}`);
    }
}