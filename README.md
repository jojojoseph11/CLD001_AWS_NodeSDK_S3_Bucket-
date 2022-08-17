## CLD001 : AWS Basics -Jojo Joseph
1. Create API’s for an  image management application using NodeJs. The use cases are listed below 


*Go through the aws docs [docs](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html)SDK AWS -Node JS*


*Go through the aws docs [docs](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-node-credentials-shared.html)Loading credentials in Node.js from the shared credentials file *

---
## Features 

2. User should be able to Upload an image

3. User should be able to Get an Image 

4. User should be able to List all images 

5. User should be able to Update image 

6. User should be able to  Delete image 

7. User should be able to  Get image public URL 

8. User should be able to Change image permissions   
---
## Use Cloudformation template for creating the Bucket and Roles 

*Create a stack using .yml files in the AWS folder*

*Go through the aws docs [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html)Cloud formation S3 *
---

### Exporting the AWS_Profile :  

export AWS_PROFILE=jojo_factweavers 

### View the AWS_Profile 
Cat  .aws/credentials 

##Cli commands for packaging and deployment 

### Packing: 

  aws cloudformation package \ 

  --template /path_to_template/template.json \ 

  --s3-bucket mybucket \ 

  --output-template-file packaged-template.json \ 

  --use-json 

1. /path_to_template/template.json   is the path to the local/origianl template present in the local directory for packing 

2. mybucket is the name of s3 bucket where to store the local code .
3. packaged-templete.json means the output packaged template name in json formate resides in s3 backet.  

  

### Validating the Package: 

   aws cloudformation validate-template \ 

    --template-body file://packaged-template.json 

  

### Deploy: 

  aws cloudformation deploy \ 

  --template-file /path_to_template/packaged-template.json \ 

  --stack-name my-new-stack \ 

  --parameter-overrides Key1=Value1 Key2=Value2  

1. /path_to_template/packaged-template.json    is the path to the packaged templete file 

2. my-new-stack The name of the AWS CloudFormation stack you're deploying to .

3. Key1=Value1 Key2=Value2 is a list of parameter structures that specify input parameters for your stack template. 

 

### Deploying and Creating Stack in One (Alternative) 

aws cloudformation create-stack --stack-name training123 --template-body file://S3Bucket.yml  

 

