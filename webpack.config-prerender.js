let Webpack = require("webpack");
let ExtractTextPlugin = require("extract-text-webpack-plugin");

export default {
  // Compilation target http://webpack.github.io/docs/configuration.html#target
  target: "node",

  // Debug mode http://webpack.github.io/docs/configuration.html#debug
  debug: false,

  // Enhance debugging http://webpack.github.io/docs/configuration.html#devtool
  devtool: undefined,

  // Capture timing information http://webpack.github.io/docs/configuration.html#profile
  profile: false,

  // Entry files
  entry: {
    main: "./config/prerender?main",
  },

  // Output files
  output: {
    path: __dirname + "/build/prerender",
    publicPath: "/_assets/",
    filename: "[name].js",
    chunkFilename: "[name].js",
    sourceMapFilename: "debugging/[file].map",
    libraryTarget: "commonjs2",
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
      {test: /\.(css(\?.*)?)$/, loaders: ["null-loader", "css-loader"]},

      // LESS
      {test: /\.(less(\?.*)?)$/, loaders: ["null-loader", "css-loader", "less-loader"]},
    ],
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

  plugins: [
    new Webpack.PrefetchPlugin("react"),
    new Webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
    new Webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
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
