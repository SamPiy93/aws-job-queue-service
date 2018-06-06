import * as AWS from 'aws-sdk';
import { handleResponse } from './responseHandle';
import { Promise } from 'core-js';

const SQS = new AWS.SQS();

export const publishToSnsTopic = (message: string, topicArn: string): Promise<any> => {
  return new Promise<any>((resolve: any, reject: any) => {
    const SNS = new AWS.SNS();
    SNS.publish({
      Message: message,
      TopicArn: topicArn
    }, (err, data) => {
      if (err) {
        console.error('error occurred while publishing to sns topic => ' + topicArn, err);
        reject(handleResponse(err.toString(), 502));
      }

      console.log('successfully published to sns topic => ' + topicArn, data);
      resolve(handleResponse(null, 200, data));
    });
  });
};

export const configSQS = () => {
  console.log('configure sqs service call');
}

export const configAWS = (region: string, accessKeyId: string, secretAccessKey: string): Promise<any> => {
  return new Promise<any>((resolve: any, reject: any) => {
    try {
      AWS.config.update({
        region: region
      });
      AWS.config.credentials = {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
      };
      console.log('AWS configuration successful.');
      resolve(handleResponse(null, 200, 'AWS configuration successfull.'));
    } catch (error) {
      console.error('AWS configuration process caused an error.', error);
      reject(handleResponse(error, 502));
    }
  });
}
