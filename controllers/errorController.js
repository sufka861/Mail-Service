function errorHandler(req, res) {
  res.writeHead(404);
  res.write(`Bad request`);
  res.end();
}

module.exports = function logAndErrorHandler(req, res, err) {
  console.error(err);
  return errorHandler(req, res);
};
