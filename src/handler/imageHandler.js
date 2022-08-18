const helper = require('../services/awsServiceS3');

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



// Get Image object based on the key  eg DSC_0096.jpg   req.name=DSC_0096.jpg 
module.exports.getImage = async (req, res) => {
    try {
        console.log(req);
        let response = await helper.serGetImage(req.body);
        console.log("Sucessfully Fetched : ", req.name);
        res.send(response);
    } catch (error) {
        console.log("ImageHandler getImageError", error);
    }
};

//Listing all images 
module.exports.listAllImage = async (req, res) => {
    try {
        let response = await helper.serListAllImage(req.query);
        res.send(response);
    } catch (error) {
        console.log("ImageHandler listAllImage Error", error);
    }
};

//Delete image from bucket { "name" : "DSC_0096.jpg" }
module.exports.deleteImage = async (req, res) => {
    try {
        let response = await helper.serDeleteImage(req.body);
        res.send(response);
    } catch (error) {
        console.log("ImageHandler deleteImage Error", error);
    }
};


// Image Permission 
module.exports.changeImagePermission = async (req, res) => {
    try {
        let response = await helper.changeImagePermission(req.query);
        res.send(response);

    } catch (error) {
        console.log("ImageHandler changeinPermission Error", error);
    }
};

//Get URL  query query prams  -->  key :  profile.jpg localhost:3000/api/getPublicUrl?key=profile.jpg
module.exports.getPublicUrl = async (req, res) => {
    try {
        let response = await helper.serGetPublicUrl(req.query.key);
        res.send(response);
    } catch (error) {
        console.log("ImageHandler getPublicUrl Error", error);
    }
};