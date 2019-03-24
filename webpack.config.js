const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve('./app'),
  entry: './assets/js/app.js',
  module: {
    rules: [{
        // HTML loader and minifier
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            minimize: true
          }
        }]
      },
      {
        // Load images
        test: /\.(png|jpe?g)/i,
        use: [{
            loader: "url-loader",
            options: {
              name: "img/[name].[ext]",
              limit: 30 * 1024
            }
          },
          {
            loader: "img-loader"
          }
        ]
      },
      {
        // Optmize image
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        enforce: 'pre'
      },
      {
        // Compile SASS
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        // Load CSS
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        // ESLinte
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        // BABEL
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },

  // Minify JS and CSS
  // Setting optimization.minimizer overrides the defaults provided by webpack, 
  // so make sure to also specify a JS minimize
  // https://github.com/webpack-contrib/mini-css-extract-plugin

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: '.',
      ignore: ['**/*.js', '**/*.html', 'assets/**/*.*', 'vendor/**/*.*'],
      to: '.'
    }]),
    new HtmlWebPackPlugin({
      template: "index.html",
      filename: "./index.html"
    }),
    new HtmlWebPackPlugin({
      template: "contact.html",
      filename: "./contact.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};