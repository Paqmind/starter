let Webpack = require("webpack");
//let ExtractTextPlugin = require("extract-text-webpack-plugin");

export default {
  // Compilation target http://webpack.github.io/docs/configuration.html#target
  target: "web",

  // Debug mode http://webpack.github.io/docs/configuration.html#debug
  debug: false,

  // Enhance debugging http://webpack.github.io/docs/configuration.html#devtool
  devtool: undefined,

  // Capture timing information http://webpack.github.io/docs/configuration.html#profile
  profile: false,

  // Entry files http://webpack.github.io/docs/configuration.html#entry
  entry: {
    main: "./frontend/app?main",
  },

  // Output files http://webpack.github.io/docs/configuration.html#output
  output: {
    path: __dirname + "/public",
    publicPath: "/public/",
    filename: "[name].js?[chunkhash]",
    chunkFilename: "[name].js?[chunkhash]",
    sourceMapFilename: "debugging/[file].map",
    libraryTarget: undefined,
    pathinfo: false,
  },

  // Module http://webpack.github.io/docs/configuration.html#module
  module: {
    loaders: [ // http://webpack.github.io/docs/loaders.html
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
      {test: /\.(css(\?.*)?)$/, loaders: ["style", "css"]}, // loader: ExtractTextPlugin.extract("style-loader", "css-loader")},

      // LESS
      {test: /\.(less(\?.*)?)$/, loaders: ["style", "css", "less"]}, // loader: ExtractTextPlugin.extract("style-loader", ["css-loader", "less-loader"])},
    ],
  },

  // Module resolving http://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    // Abs. path with modules
    root: __dirname + "/frontend",

    // node_modules and like that
    modulesDirectories: ["web_modules", "node_modules"],
  },

  // Loader resolving http://webpack.github.io/docs/configuration.html#resolveloader
  resolveLoader: {
    // Abs. path with loaders
    root: __dirname + "/node_modules",

    alias: {},
  },

  // Keep bundle dependencies http://webpack.github.io/docs/configuration.html#externals
  externals: [],

  // Plugins http://webpack.github.io/docs/list-of-plugins.html
  plugins: [
    //new Webpack.PrefetchPlugin("react"),
    //new Webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
    //new Webpack.optimize.CommonsChunkPlugin("commons", "commons.js?[chunkhash]"),
    //new ExtractTextPlugin("[name].css?[contenthash]"),
    //new Webpack.optimize.UglifyJsPlugin(),
    //new Webpack.optimize.DedupePlugin(),
    new Webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    //new Webpack.NoErrorsPlugin(),
  ],

  // CLI mirror http://webpack.github.io/docs/configuration.html#devserver
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
