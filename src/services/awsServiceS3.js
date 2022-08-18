const fs = require('fs'); //for 
//Load environment variables from .env file https://www.npmjs.com/package/dotenv
require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const bucketName = process.env.AWS_BUCKET_NAME;
const S3Obj = new S3({});

// Create an file to be uploaded to S3
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

// Upload the file to S3
this.serGetUploadImage = async (file) => {

    let uploadPath = __dirname + '/../../uploads/' + file.name;
    let reader = fs.createReadStream(uploadPath);
    let parameter = {
        Bucket: bucketName,
        Body: reader,
        Key: file.name

    }
    let response = S3Obj.putObject(parameter).promise();
    return response.then(function (data) {
        console.log(
            "Successfully created " +
            { data } +
            " and uploaded it to " +
            parameter.Bucket +
            "/" +
            parameter.Key
        );
        return data;

    }).catch(function (err) {
        return err;
    });

}


// Get a object based on the key  eg DSC_0096.jpg   req.name=DSC_0096.jpg 
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

//Fetch a list of images upto 1000
this.serListAllImage = async (req) => {
    let parameter = {
        Bucket: bucketName,
        MaxKeys: req.limit
    }
    console.log(parameter);

    let response = S3Obj.listObjectsV2(parameter).promise();
    return response.then(function (data) {
        console.log(
            "Successfully fetched " +
            data
        );
        return data;

    }).catch(function (err) {
        return err;
    });

}



//Delete an object from image    expecting { "name" : "DSC_0096.jpg" }
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



//Image permission
this.changeImagePermission = async (req) => {
    if (req.permission == "ReadGroupAllUsers") {
        let parameter = {
            Bucket: bucketName,
            Key: req.name,
            AccessControlPolicy: {
                Grants: [
                    {
                        Grantee: {
                            Type: "Group",
                            URI: 'http://acs.amazonaws.com/groups/global/AllUsers',
                        },
                        Permission: "READ",
                    }
                ],
            }
        }
        let response = S3Obj.putObjectAcl(parameter).promise();
        return response.then(function (data) {
            return data;

        }).catch(function (err) {
            return err;
        });
    } else {
        return ('only ReadGroupAllUsers is defined ');
    }



}

//incase of upload failed
this.deleteImageFromServer = (file) => {
    let uploadPath = __dirname + '/../../uploads/' + file.name;
    fs.unlinkSync(uploadPath);
}


//url
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