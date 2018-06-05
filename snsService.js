const AWS = require('aws-sdk');

const SNS = new AWS.SNS();

module.exports.publishToSnsTopic = () => {
  console.log('publish to sns topic service call');
  console.log(new AWS.SQS());
};

module.exports.configSQS = () => {
  console.log('configure sqs service call');
}

module.exports.configAWS = (region, accessKeyId, secretAccessKey) => {
  console.log('configure sns service call');
  
  try {
    AWS.config.update({
      region: region
    });
  
    AWS.config.credentials = {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    };

    console.log('AWS configuration successful.');
    return {status: 'successfully configured!', statusCode: 200};
  } catch (error) {
    console.error('AWS configuration process caused an error.', error);
    return {status: 'error caused by aws configuration', statusCode: 304};
  }
}