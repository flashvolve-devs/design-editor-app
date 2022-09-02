const multer = require('multer')

const storage = multer.diskStorage({
    filename: function (_req, file, callback) {
        let fileName = file.originalname
        callback(null, fileName)
    },
    destination: function (_req, _file, callback) {
        let pathFolder = './assets/fonts'
        callback(null, pathFolder)
    }
})

let upload = multer({storage})

module.exports = upload