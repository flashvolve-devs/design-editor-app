const express = require('express')
const router = express.Router()

const MainController = require('../controllers/image.controller')

router.get('/', MainController.home)
router.post('/image' , MainController.createImage)


module.exports = router