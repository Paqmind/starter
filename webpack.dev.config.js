export default require("./make-webpack-config")({
	devServer: true,
	hotComponents: true,
	devtool: "eval",
	debug: true
});


// export function getConfig(type) {
//
//  let isDev = type === 'development';
//
//  let config = {
//    entry: './app/scripts/main.js',
//    output: {
//      path: __dirname,
//      filename: 'main.js'
//    },
//    debug : isDev,
//    module: {
//      loaders: [{
//        test: /\.jsx?$/,
//        exclude: /node_modules/,
//        loader: 'babel-loader'
//      }]
//    }
//  };
//
//  if (isDev){
//    config.devtool = 'eval';
//  }
//
//  return config;
//};