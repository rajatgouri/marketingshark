const config = require('../config');

var AwsS3 = require('aws-sdk/clients/s3');
const s3 = new AwsS3({
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKey,
  region: config.awsRegion,
});


exports.uploadAws =  function(bucket, filePath, fileContent, fileType) {

    return new Promise((resolve, reject) => {
      const params = {
        Bucket: bucket,
        Key: filePath,
        Body: fileContent,
        ContentType: fileType,
        ACL: 'public-read'
      };
  
      s3.upload(params, (err, response) => {
        if (err) {
          console.log(err)
          reject(err);
        } else {
          console.log("Successfully uploaded data from  bucket");

          resolve(response)
        }
      })
    })
  }
  
exports.readAws = function(bucket, filePath) {
    console.log(bucket, filePath)
    return new Promise((resolve, reject) => {

        const params = {
            Bucket: bucket,
            Key: filePath,
        };


        s3.getObject(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                console.log("Successfully dowloaded data from  bucket");
                resolve(data);
            }
        });
    });
}

exports.deleteAws = function(bucket, filePath) {
  console.log(bucket, filePath)
  return new Promise((resolve, reject) => {

      const params = {
          Bucket: bucket,
          Key: filePath,
      };


      s3.deleteObject(params, function (err, data) {
          if (err) {
              reject(err);
          } else {
              console.log("Successfully Deleted Data from  bucket");
              resolve(data);
          }
      });
  });
}

