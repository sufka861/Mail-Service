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
    res.setHeader("Access-Control-Allow-Origin", "*");

    switch (Path.extname(pathName)) {
      case ".js":
        res.setHeader("Content-Type", "text/javascript");
        break;
      case ".css":
        res.setHeader("Content-Type", "text/css");
        break;
      case ".html":
        res.setHeader("Content-Type", "text/html");
        break;
    }

    res.status(200);
    res.sendFile(Path.join(process.cwd() + "/Front" + pathName));
  } catch (err) {
    return errorHandler(req, res);
  }
}

module.exports = {
  loadPage,
  errorHandler,
};
