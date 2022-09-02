const MainController = require('../controllers/image.controller')
const upload = require('../functions/configMulter')
const express = require('express')
const router = express.Router()

router.get('/', MainController.home)
router.post('/image', MainController.createImage)
router.post('/fonts', upload.single('file'), MainController.uploadFonts)


module.exports = router