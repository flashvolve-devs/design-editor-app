const UploadController = require('../controllers/upload.controller');
const router = require('express').Router();

router.post('/', UploadController.createImage);
router.post('/template', UploadController.template);

module.exports = router;