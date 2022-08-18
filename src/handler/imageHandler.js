const helper = require('../services/helper');

module.exports.uploadImage = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files.image).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        // Movinf image to uploads folder
        let blnimage = await helper.saveImage(req.files.image);
        if (!(blnimage === true)) {
            res.send('File upload failed')
        }
        else {
            // Uploaded image to S3 bucket
            try {
                let response = await helper.serGetUploadImage(req.files.image);
                helper.deleteImageFromServer(req.files.image);
                res.send(response);
            } catch (error) {
                console.log("S3upload Error", error);
            }
        }

    } catch (error) {
        console.log("ImageHandler Error", error);
    }
};




module.exports.getImage = async (req, res) => {
    try {
        let response = await helper.serGetImage(req.query);
        res.send(response);
    } catch (error) {
        console.log("ImageHandler getImageError", error);
    }
};

module.exports.listAllImage = async (req, res) => {
    try {
        let response = await helper.serListAllImage(req.query);
        res.send(response);
    } catch (error) {
        console.log("ImageHandler listAllImage Error", error);
    }
};

module.exports.deleteImage = async (req, res) => {
    try {
        let response = await helper.serDeleteImage(req.query);
        res.send(response);
    } catch (error) {
        console.log("ImageHandler deleteImage Error", error);
    }
};

module.exports.changeImagePermission = async (req, res) => {
    try {
        let response = await helper.changeImagePermission(req.query);
        res.send(response);

    } catch (error) {
        console.log("ImageHandler changeinPermission Error", error);
    }
};

module.exports.getPublicUrl = async (req, res) => {
    try {
        let response = await helper.serGetPublicUrl(req.query.key);
        res.send(response);
    } catch (error) {
        console.log("ImageHandler getPublicUrl Error", error);
    }
};