import { S3Client } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
require('dotenv').config();   //.environment  


// Set the AWS Region.
const REGION = process.env.REGION;
const AWS_PROFILE = process.env.AWS_PROFILE;
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ credentials: fromIni({ profile: AWS_PROFILE }), region: REGION });
export { s3Client };