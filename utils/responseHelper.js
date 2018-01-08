
// seteo general de la respuesta para unicamente configurar errores y http_code
const respond = (res, data, httpCode) => {
  const responseHTTPCode = httpCode || 500;

  if (data !== null && data !== undefined) {
    return res.status(responseHTTPCode).json(data);
  }
  return res.status(responseHTTPCode).json({});
};

module.exports = respond;
