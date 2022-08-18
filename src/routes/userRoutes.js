const router = require('express').Router();

const fhUpload = require('../handler/imageHandler');

router.get('/status', async function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.send('Factweavers service is up and running')
})
router.post('/uploadImage', fhUpload.uploadImage);
router.get('/getImage', fhUpload.getImage); 
router.get('/listAllImage', fhUpload.listAllImage);
router.get('/deleteImage', fhUpload.deleteImage);
router.get('/getPublicUrl', fhUpload.getPublicUrl);
router.get('/changeImagePermission', fhUpload.changeImagePermission);

module.exports = router;