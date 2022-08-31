const express = require('express')
const router = express.Router()

const MainController = require('../controller/MainController')

router.get('/', MainController.home)
router.post('/image' , MainController.createImage)


module.exports = router