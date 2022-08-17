const fs = require('fs');
require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const bucketName = process.env.AWS_BUCKET_NAME;
const S3Obj = new S3({});

this.saveImage = (file) => {

    let uploadPath = __dirname + '/../../uploads/' + file.name;
    return new Promise(
        function (resolve, reject) {
            file.mv(uploadPath, function (err) {
                if (err) {
                    reject(err)
                }
                resolve(true);
            })
        })
};


this.serGetUploadImage = async (file) => {

    let uploadPath = __dirname + '/../../uploads/' + file.name;
    let reader = fs.createReadStream(uploadPath);

    //fs.unlinkSync(uploadPath);

    let parameter = {
        Bucket: bucketName,
        Body: reader,
        Key: file.name

    }


    let response = S3Obj.putObject(parameter).promise();
    return response.then(function (data) {
        return data;

    }).catch(function (err) {
        return err;
    });

}



this.serGetImage = async (req) => {
    let parameter = {
        Bucket: bucketName,
        Key: req.name
    }
    console.log(parameter);

    let response = S3Obj.getObject(parameter).promise();
    return response.then(function (data) {
        return data;

    }).catch(function (err) {
        return err;
    });

}


this.serListAllImage = async (req) => {
    let parameter = {
        Bucket: bucketName,
        MaxKeys: req.limit
    }
    console.log(parameter);

    let response = S3Obj.listObjectsV2(parameter).promise();
    return response.then(function (data) {
        return data;

    }).catch(function (err) {
        return err;
    });

}

this.serDeleteImage = async (req) => {
    let parameter = {
        Bucket: bucketName,
        Delete: {
            Objects: [
                {
                    Key: req.name
                }
            ],
            Quiet: false
        }
    };

    let response = S3Obj.deleteObjects(parameter).promise();
    return response.then(function (data) {
        return data;

    }).catch(function (err) {
        return err;
    });

}

this.changeImagePermission = async (req) => {
    let parameter = {
        Bucket: bucketName,
        Key: req.name,
        ACL: req.permission
    }

    let response = S3Obj.putObjectAcl(parameter).promise();
    return response.then(function (data) {
        return data;

    }).catch(function (err) {
        return err;
    });

}

this.deleteImageFromServer = (file) => {
    let uploadPath = __dirname + '/../../uploads/' + file.name;
    fs.unlinkSync(uploadPath);
}

this.serGetPublicUrl = async (key) => {
    let parameter = {
        Bucket: bucketName,
        Key: key
    }

    let response = S3Obj.headObject(parameter).promise();
    return response.then(function (data) {
        //return data;
        return `https://${bucketName}.s3.amazonaws.com/${key}`;
    }).catch(function (err) {
        return err;
    });


}