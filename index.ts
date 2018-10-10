import * as SNSService from './snsService';
import { handleResponse } from './responseHandle';

export const publishToSns = async (message: string, topicArn: string) => {
  try {
    const result: any = await SNSService.publishToSnsTopic(message, topicArn);
    if (result.statusCode === 502) {
      return handleResponse(result.status, 502);
    }
    console.log('successfully published SNS message to queue');
    return handleResponse(null, result.statusCode, result.status);
  } catch (error) {
    return handleResponse(error, 502);
  }
}

export const configAWS = async (region: string, accessKeyId: string, secretAccessKeyId: string) => {
  if (region === undefined || accessKeyId === undefined || secretAccessKeyId === undefined) {
    console.error('AWS configuration process caused an error. Required number of parameters not satisfied');
    return {
      status: 'error caused by aws configuration',
      statusCode: 304
    };
  }

  try {
    const result = await SNSService.configAWS(region, accessKeyId, secretAccessKeyId);
    if (result.statusCode === 200) {
      console.log(result.status);
      return handleResponse(null, 200, 'configuration success');
    }
    return handleResponse(null, 401, 'configuration error occurred.');
  } catch (error) {
    console.error('config error => ' + error);
    return handleResponse(error, 401);
  }
}