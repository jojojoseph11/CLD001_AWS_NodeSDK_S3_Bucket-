const AWS = require('aws-sdk'); //import all
require('dotenv').config({ path: "./vars/.env" });   //.environment  


// Set the AWS Region.
const REGION = process.env.REGION;
const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID;
const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY;


//another approch with ACCESS_KEY_ID and SERETS_ACESSS
const s3Client = new AWS.S3({
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
    region: REGION
})

module.exports = { s3Client };


//not used but need to test 
