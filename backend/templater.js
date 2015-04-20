// IMPORTS =========================================================================================
let Nunjucks = require("nunjucks");

// TEMPLATER =======================================================================================
export default function (app) {
  app.set("views", __dirname);
  app.set("view engine", "html");

  return Nunjucks.configure("backend", {
    autoescape: true,
    express: app
  });
}