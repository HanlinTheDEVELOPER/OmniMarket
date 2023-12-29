export const successResponse = (statusCode, message, data) => {
  return {
    statusCode,
    message,
    data,
  };
};

export const errorResponse = (statusCode, message) => {
  const errorCode = 1;
  return {
    errorCode: errorCode,
    statusCode,
    message,
  };
};
