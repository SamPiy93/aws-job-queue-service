export function handleResponse(err?: string | null, statusCode?: number, message?: any) {
  if (err) {
    return {status: err, statusCode: statusCode};
  }
  return {status: message, statusCode: statusCode};
}