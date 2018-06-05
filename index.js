const { publishToSnsTopic } = require('./snsService');
const { configAWS } = require('./snsService');

module.exports.publishToSns = () => {
  console.log('publishing data to sns topic');
  publishToSnsTopic();
}

module.exports.configAWS = (region, accessKeyId, secretAccessKeyId) => {
  if (region === undefined || accessKeyId === undefined || secretAccessKeyId === undefined) {
    console.error('AWS configuration process caused an error. Required number of parameters not satisfied');
    return {status: 'error caused by aws configuration', statusCode: 304};  
  }
  console.log('configuring AWS...', region);
  const result = configAWS(region, accessKeyId, secretAccessKeyId);
  
  if (result.statusCode === 200) { 
    console.log(result.status);
    return {status: 'configuration success', statusCode: 200};
  }

  return {status: 'configuration error occurred.', statusCode: 401};
}