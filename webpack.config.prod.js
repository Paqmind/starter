export default require("./webpack.make-config")({
  // commonsChunk: true,
  longTermCaching: true,
  separateStylesheet: true,
  minimize: true,
  prerender: true
});