require('dotenv').config();
const debug = process.env.ENVIRONMENT !== "PRODUCTION";
const webpack = require('webpack');
const WebpackBeforeBuildPlugin = require('before-build-webpack');
const cleandir = require('clean-dir');

module.exports = {
  context: __dirname,
  entry: "./src/client/scripts.js",
  output: {
    path: __dirname + "/src/client/",
    filename: "scripts.min.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new WebpackBeforeBuildPlugin((compiler, continueCompilation) => {
      cleandir('./src/client/dist', error => console.log(error));
      cleandir('./src/client/styles/css', error => console.log(error));
      cleandir('./src/client/precompiled-dist', error => console.log(error));
      continueCompilation();
    })
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.woff($|¿)|\.woff2($|¿)|\.ttf($|¿)|\.eot($|¿)|\.svg($|¿)/,
        loader: "url-loader"
      }
    ]
  }
};
