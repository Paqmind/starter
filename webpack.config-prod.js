let Webpack = require("webpack");
let ExtractTextPlugin = require("extract-text-webpack-plugin");

export default {
  // Compilation target http://webpack.github.io/docs/configuration.html#target
  target: "web",

  // Debug mode http://webpack.github.io/docs/configuration.html#debug
  debug: false,

  // Enhance debugging http://webpack.github.io/docs/configuration.html#devtool
  devtool: undefined,

  // Capture timing information http://webpack.github.io/docs/configuration.html#profile
  profile: false,

  // Entry files
  entry: {
    main: "./config/app?main",
  },

  // Output files
  output: {
    path: __dirname + "/build/public",
    publicPath: "/_assets/",
    filename: "[name].js?[chunkhash]",
    chunkFilename: "[name].js?[chunkhash]",
    sourceMapFilename: "debugging/[file].map",
    libraryTarget: undefined,
    pathinfo: false,
  },

  // Loaders
  module: {
    loaders: [
      // JS
      {test: /\.(js(\?.*)?)$/, loaders: ["babel-loader"], exclude: /node_modules/ }, // ?stage=2 ????

      // JSON
      {test: /\.(json(\?.*)?)$/,  loaders: ["json-loader"]},
      {test: /\.(json5(\?.*)?)$/, loaders: ["json5-loader"]},

      // RAW
      {test: /\.(txt(\?.*)?)$/, loaders: ["raw-loader"]},

      // URL
      {test: /\.(jpg(\?.*)?)$/,   loaders: ["url-loader?limit=10000"]},
      {test: /\.(jpeg(\?.*)?)$/,  loaders: ["url-loader?limit=10000"]},
      {test: /\.(png(\?.*)?)$/,   loaders: ["url-loader?limit=10000"]},
      {test: /\.(gif(\?.*)?)$/,   loaders: ["url-loader?limit=10000"]},
      {test: /\.(svg(\?.*)?)$/,   loaders: ["url-loader?limit=10000"]},
      {test: /\.(woff(\?.*)?)$/,  loaders: ["url-loader?limit=100000"]},
      {test: /\.(woff2(\?.*)?)$/, loaders: ["url-loader?limit=100000"]},

      // FILE
      {test: /\.(ttf(\?.*)?)$/, loaders: ["file-loader"]},
      {test: /\.(eot(\?.*)?)$/, loaders: ["file-loader"]},
      {test: /\.(wav(\?.*)?)$/, loaders: ["file-loader"]},
      {test: /\.(mp3(\?.*)?)$/, loaders: ["file-loader"]},

      // HTML
      {test: /\.(html(\?.*)?)$/, loaders: ["html-loader"]},

      // MARKDOWN
      {test: /\.(md(\?.*)?)$/, loaders: ["html-loader", "markdown-loader"]},

      // CSS
      {test: /\.(css(\?.*)?)$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},

      // LESS
      {test: /\.(less(\?.*)?)$/, loader: ExtractTextPlugin.extract("style-loader", ["css-loader", "less-loader"])},
    ],
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

  plugins: [
    function () {
      this.plugin("done", function (stats) {
        let jsonStats = stats.toJson({
          chunkModules: true,
          exclude: [
            /node_modules[\\\/]react(-router)?[\\\/]/,
            /node_modules[\\\/]items-store[\\\/]/
          ]
        });
        jsonStats.publicPath = "/_assets/";
        require("fs").writeFileSync(__dirname + "/build/stats.json", JSON.stringify(jsonStats));
      });
    },
    new Webpack.PrefetchPlugin("react"),
    new Webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
    //new Webpack.optimize.CommonsChunkPlugin("commons", "commons.js?[chunkhash]"),
    new ExtractTextPlugin("[name].css?[contenthash]"),
    new Webpack.optimize.UglifyJsPlugin(),
    new Webpack.optimize.DedupePlugin(),
    new Webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new Webpack.NoErrorsPlugin(),
  ],

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
