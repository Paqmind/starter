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
    main: "./frontend/prerender?main",
  },

  // Output files
  output: {
    path: __dirname + "/public",
    publicPath: "/public/",
    filename: "prerender.[name].js",
    chunkFilename: "prerender.[name].js",
    sourceMapFilename: "debugging/[file].map",
    libraryTarget: "commonjs2",
    pathinfo: false,
  },

  // Loaders
  module: {
    loaders: [
      // JS
      {test: /\.(js(\?.*)?)$/, loaders: ["babel"], exclude: /node_modules/ }, // ?stage=2 ????

      // JSON
      {test: /\.(json(\?.*)?)$/,  loaders: ["json"]},
      {test: /\.(json5(\?.*)?)$/, loaders: ["json5"]},

      // RAW
      {test: /\.(txt(\?.*)?)$/, loaders: ["raw"]},

      // URL
      {test: /\.(jpg(\?.*)?)$/,   loaders: ["url?limit=10000"]},
      {test: /\.(jpeg(\?.*)?)$/,  loaders: ["url?limit=10000"]},
      {test: /\.(png(\?.*)?)$/,   loaders: ["url?limit=10000"]},
      {test: /\.(gif(\?.*)?)$/,   loaders: ["url?limit=10000"]},
      {test: /\.(svg(\?.*)?)$/,   loaders: ["url?limit=10000"]},
      {test: /\.(woff(\?.*)?)$/,  loaders: ["url?limit=100000"]},
      {test: /\.(woff2(\?.*)?)$/, loaders: ["url?limit=100000"]},

      // FILE
      {test: /\.(ttf(\?.*)?)$/, loaders: ["file"]},
      {test: /\.(eot(\?.*)?)$/, loaders: ["file"]},
      {test: /\.(wav(\?.*)?)$/, loaders: ["file"]},
      {test: /\.(mp3(\?.*)?)$/, loaders: ["file"]},

      // HTML
      {test: /\.(html(\?.*)?)$/, loaders: ["html"]},

      // MARKDOWN
      {test: /\.(md(\?.*)?)$/, loaders: ["html", "markdown"]},

      // CSS
      {test: /\.(css(\?.*)?)$/, loaders: ["null", "css"]},

      // LESS
      {test: /\.(less(\?.*)?)$/, loaders: ["null", "css", "less"]},
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
