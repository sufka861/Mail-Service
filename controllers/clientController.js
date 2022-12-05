const { URL } = require("url");

const Path = require("path");

function errorHandler(req, res) {
  res.writeHead(404);
  res.write(`Bad request`);
  res.end();
}

function loadPage(req, res) {
  const pathName = new URL(req.url, `http://${req.headers.host}`).pathname;
  res.status(200);
  try {
    res.sendFile(Path.join(process.cwd() + "/Front" + pathName));
  } catch (err) {
    return errorHandler(req, res);
  }
}

module.exports = {
  loadPage,
  errorHandler,
};
