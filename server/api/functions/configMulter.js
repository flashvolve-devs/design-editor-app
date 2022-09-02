const multer = require('multer')

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        let fileName = Date.now() + '-' + file.originalname
        callback(null, fileName)
    },
    destination: function (req, file, callback) {
        let pathFolder = './assets/fonts'
        callback(null, pathFolder)
    }
})

let upload = multer({storage})

module.exports = upload