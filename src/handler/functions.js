const helper = require('../services/helper');

module.exports.uploadImage = async (req, res) => {

    if (!req.files || Object.keys(req.files.image).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let blnimage = await helper.saveImage(req.files.image);
    if (!(blnimage === true)) {
        res.send('File upload failed')
    }
    else {
        let response = await helper.serGetUploadImage(req.files.image);
        helper.deleteImageFromServer(req.files.image);
        res.send(response);
    }


};


module.exports.getImage = async (req, res) => {
    let response = await helper.serGetImage(req.query);
    res.send(response);
};

module.exports.listAllImage = async (req, res) => {
    let response = await helper.serListAllImage(req.query);
    res.send(response);
};

module.exports.deleteImage = async (req, res) => {
    let response = await helper.serDeleteImage(req.query);
    res.send(response);
};

module.exports.changeImagePermission = async (req, res) => {
    let response = await helper.changeImagePermission(req.query);
    res.send(response);
};

module.exports.getPublicUrl = async (req, res) => {
    let response = await helper.serGetPublicUrl(req.query.key);
    res.send(response);
};