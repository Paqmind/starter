let Webpack = require("webpack");
let loadersByExtension = require("./config/loaders-by-extension");

let loaders = {
  "json": "json-loader",
  "js": {
    test: /\.js/, // /\.js$/ -- not working ^_^
    exclude: /node_modules/,
    loaders: ["react-hot-loader", "babel-loader"] // ?stage=2 ????
  },
  "json5": ["json5-loader"],
  "txt": ["raw-loader"],
  "png": ["url-loader?limit=10000"],
  "jpg": ["url-loader?limit=10000"],
  "jpeg": ["url-loader?limit=10000"],
  "gif": ["url-loader?limit=10000"],
  "svg": ["url-loader?limit=10000"],
  "woff": ["url-loader?limit=100000"],
  "woff2": ["url-loader?limit=100000"],
  "ttf": ["file-loader"],
  "eot": ["file-loader"],
  "wav": ["file-loader"],
  "mp3": ["file-loader"],
  "html": ["html-loader"],
  "md": ["html-loader", "markdown-loader"],
  "css": ["style-loader", "css-loader"],
  "less": ["style-loader", "css-loader", "less-loader"],
};

let output = {
  path: __dirname + "/build/public",
  publicPath: "http://localhost:2992/_assets/",
  filename: "[name].js",
  chunkFilename: "[id].js",
  sourceMapFilename: "debugging/[file].map",
  libraryTarget: undefined,
  pathinfo: true,
};

let plugins = [
  function () {
    this.plugin("done", function (stats) {
      let jsonStats = stats.toJson({
        chunkModules: true,
        exclude: [
          /node_modules[\\\/]react(-router)?[\\\/]/,
          /node_modules[\\\/]items-store[\\\/]/
        ]
      });
      jsonStats.publicPath = "http://localhost:2992/_assets/";
      require("fs").writeFileSync(__dirname + "/build/stats.json", JSON.stringify(jsonStats));
    });
  },
  new Webpack.PrefetchPlugin("react"),
  new Webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
];

export default {
  target: "web",

  debug: true,

  devtool: "source-map",

  entry: {
    main: "./config/app?main",
  },

  output: output,

  // Loaders
  module: {
    loaders: loadersByExtension(loaders),
  },

  resolveLoader: {
    root: __dirname + "/node_modules",
    alias: {},
  },

  // Externals
  externals: [],

  resolve: {
    root: __dirname + "/app",
    modulesDirectories: ["web_modules", "node_modules"],
  },

  plugins: plugins,

  devServer: {
    stats: {
      cached: false,
      exclude: [
        /node_modules[\\\/]react(-router)?[\\\/]/,
        /node_modules[\\\/]items-store[\\\/]/
      ]
    }
  }
};
