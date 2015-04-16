export default require("./make-webpack-config")({
  // commonsChunk: true,
  longTermCaching: true,
  separateStylesheet: true,
  minimize: true,
  prerender: true
});