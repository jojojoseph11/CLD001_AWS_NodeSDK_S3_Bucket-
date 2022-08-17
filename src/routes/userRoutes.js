const router = require('express').Router();

const fhUpload = require('../handler/functions');

router.post('/uploadImage', fhUpload.uploadImage);
router.get('/getImage', fhUpload.getImage);
router.get('/listAllImage', fhUpload.listAllImage);
router.get('/deleteImage', fhUpload.deleteImage);
router.get('/getPublicUrl', fhUpload.getPublicUrl);
router.get('/changeImagePermission', fhUpload.changeImagePermission);

module.exports = router;