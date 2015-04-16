let Webpack = require("webpack");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let loadersByExtension = require("./config/loaders-by-extension");

let loaders = {
  "json": "json-loader",
  "js": {
    test: /\.js/, // /\.js$/ -- not working ^_^
    exclude: /node_modules/,
    loaders: ["react-hot-loader", "babel-loader"] // ?stage=2 ????
  },
  "json5": "json5-loader",
  "txt": "raw-loader",
  "png": "url-loader?limit=10000",
  "jpg": "url-loader?limit=10000",
  "jpeg": "url-loader?limit=10000",
  "gif": "url-loader?limit=10000",
  "svg": "url-loader?limit=10000",
  "woff": "url-loader?limit=100000",
  "woff2": "url-loader?limit=100000",
  "ttf": "file-loader",
  "eot": "file-loader",
  "wav": "file-loader",
  "mp3": "file-loader",
  "html": "html-loader",
  "md": ["html-loader", "markdown-loader"]
};
let stylesheetLoaders = {
  "css": "css-loader",
  "less": "css-loader!less-loader",
  "styl": "css-loader!stylus-loader",
  "scss|sass": "css-loader!sass-loader"
};

let output = {
  path: __dirname + "build/public",
  publicPath: "http://localhost:2992/_assets/",
  filename: "[name].js",
  chunkFilename: "[id].js",
  sourceMapFilename: "debugging/[file].map",
  libraryTarget: undefined,
  pathinfo: true,
};
let excludeFromStats = [
  /node_modules[\\\/]react(-router)?[\\\/]/,
  /node_modules[\\\/]items-store[\\\/]/
];
let plugins = [
  function () {
    this.plugin("done", function (stats) {
      let jsonStats = stats.toJson({
        chunkModules: true,
        exclude: excludeFromStats
      });
      jsonStats.publicPath = "http://localhost:2992/_assets/";
      require("fs").writeFileSync(__dirname + "/build/stats.json", JSON.stringify(jsonStats));
    });
  },
  new Webpack.PrefetchPlugin("react"),
  new Webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
];

Object.keys(stylesheetLoaders).forEach(function (ext) {
  let loaders = stylesheetLoaders[ext];
  if (Array.isArray(loaders)) loaders = loaders.join("!");
  stylesheetLoaders[ext] = "style-loader!" + loaders;
});

export default {
  target: "web",

  debug: true,

  devtool: "eval",

  entry: {
    main: "./config/app?main",
  },

  output: output,

  module: {
    loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders))
  },

  resolveLoader: {
    root: __dirname + "/node_modules",
    alias: {}
  },

  externals: [],

  resolve: {
    root: __dirname + "/app",
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
