let path = require("path");
let webpack = require("webpack");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let loadersByExtension = require("./config/loaders-by-extension");

let entry = {
  main: reactEntry("main"),
  // second: reactEntry("second")
};
let loaders = {
  "json": "json-loader",
  "js": {
    test: /\.js/, // /\.js$/ -- not working ^_^
    exclude: /node_modules/,
    loaders: ["babel-loader"]  // ?stage=2 ????
  },
  "json5": "json5-loader",
  "txt": "raw-loader",
  "png|jpg|jpeg|gif|svg": "url-loader?limit=10000",
  "woff|woff2": "url-loader?limit=100000",
  "ttf|eot": "file-loader",
  "wav|mp3": "file-loader",
  "html": "html-loader",
  "md|markdown": ["html-loader", "markdown-loader"]
};
let stylesheetLoaders = {
  "css": "css-loader",
  "less": "css-loader!less-loader",
  "styl": "css-loader!stylus-loader",
  "scss|sass": "css-loader!sass-loader"
};
let aliasLoader = {

};
let externals = [

];
let root = path.join(__dirname, "app");
let publicPath = "/_assets/";
let output = {
  path: path.join(__dirname, "build", "prerender"),
  publicPath: publicPath,
  filename: "[name].js",
  chunkFilename: "[name].js",
  sourceMapFilename: "debugging/[file].map",
  libraryTarget: "commonjs2",
  pathinfo: false
};
let excludeFromStats = [
  /node_modules[\\\/]react(-router)?[\\\/]/,
  /node_modules[\\\/]items-store[\\\/]/
];
let plugins = [
  new webpack.PrefetchPlugin("react"),
  new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
];
aliasLoader["react-proxy$"] = "react-proxy/unavailable";
externals.push(
  /^react(\/.*)?$/,
  "superagent",
  "async"
);
plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));

function reactEntry(name) {
  return "./config/prerender?" + name;
}
Object.keys(stylesheetLoaders).forEach(function (ext) {
  let loaders = stylesheetLoaders[ext];
  if (Array.isArray(loaders)) loaders = loaders.join("!");
  stylesheetLoaders[ext] = "null-loader";
});

export default {
  entry: entry,
  output: output,
  target: "node",
  module: {
    loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders))
  },
  devtool: undefined,
  debug: false,
  resolveLoader: {
    root: path.join(__dirname, "node_modules"),
    alias: aliasLoader
  },
  externals: externals,
  resolve: {
    root: root,
    modulesDirectories: ["web_modules", "node_modules"],
  },
  plugins: plugins,
  devServer: {
    stats: {
      cached: false,
      exclude: excludeFromStats
    }
  }
};
