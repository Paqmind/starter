// IMPORTS =========================================================================================
let Path = require("path");

// EVALS ===========================================================================================
let projectDir = Path.dirname(__dirname);
let staticDir = Path.join(projectDir, "static");

// CONFIG ==========================================================================================
export default {
  // HTTP
  "http:port": 8080,
  "http:use-etag?": true,

  // DIRS
  "project:dir": projectDir,
  "static:dir": staticDir,

  // SMTP
  "smtp:host": "localhost",
  "smtp:port": 25,

  // MAIL
  "mail:robot": "robot@localhost",
  "mail:support": "support@localhost",
};
