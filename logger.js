const logger = require("morgan");
const Path = require("path");
const fs = require("fs");

let logStream = fs.createWriteStream(
    Path.join(process.cwd(), "mailerLogger.log"),
    {
        flags: "a",
    }
);
(() => {
    process.stderr.write = logStream.write.bind(logStream);
})();

module.exports = logger("combined", {stream: logStream});
