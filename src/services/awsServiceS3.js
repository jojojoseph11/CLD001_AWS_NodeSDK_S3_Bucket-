const fs = require('fs'); //for __dirname
//Load environment variables from .env file https://www.npmjs.com/package/dotenv
require('dotenv').config();
import { s3Client } from "./libs/awsClient.js";


const bucketName = process.env.AWS_BUCKET_NAME;


// Create an Amazon S3 bucket.
async function createS3Bucket() {
    // Create an Amazon S3 bucket.
    try {
        const data = await s3Client.send(
            new CreateBucketCommand({ Bucket: params.Bucket })
        );
        console.log(data);
        console.log("Successfully created a bucket called ", data.Location);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
}

// Create an object and upload it to the Amazon S3 bucket.
const run = async () => {
    try {
        const results = await s3Client.send(new PutObjectCommand(params));
        console.log(
            "Successfully created " +
            params.Key +
            " and uploaded it to " +
            params.Bucket +
            "/" +
            params.Key
        );
        return results; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};


