let Webpack = require("webpack");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let loadersByExtension = require("./config/loaders-by-extension");

let loaders = {
  "json": "json-loader",
  "js": {
    test: /\.js/, // /\.js$/ -- not working ^_^
    exclude: /node_modules/,
    loaders: ["babel-loader"] // ?stage=2 ????
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
  path: __dirname + "/build/prerender",
  publicPath: "/_assets/",
  filename: "[name].js",
  chunkFilename: "[name].js",
  sourceMapFilename: "debugging/[file].map",
  libraryTarget: "commonjs2",
  pathinfo: false,
};

let excludeFromStats = [
  /node_modules[\\\/]react(-router)?[\\\/]/,
  /node_modules[\\\/]items-store[\\\/]/
];

let plugins = [
  new Webpack.PrefetchPlugin("react"),
  new Webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
];

plugins.push(new Webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));

Object.keys(stylesheetLoaders).forEach(function (ext) {
  let loaders = stylesheetLoaders[ext];
  stylesheetLoaders[ext] = "null-loader";
});

export default {
  target: "node",

  debug: false,

  devtool: undefined,

  entry: {
    main: "./config/prerender?main",
  },

  output: output,

  module: {
    loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders))
  },


  resolveLoader: {
    root: __dirname + "/node_modules",
    alias: {"react-proxy$": "react-proxy/unavailable"},
  },

  // Externals
  externals: [
    /^react(\/.*)?$/,
    "superagent",
    "async"
  ],

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
