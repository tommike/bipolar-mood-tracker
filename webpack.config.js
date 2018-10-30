const webpack = require('webpack');
const path = require('path');
const cssnano = require('cssnano');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const pathsToClean = ['dist'];
const metaData = require('./app/meta-data.config.js');

const productionMode = process.env.NODE_ENV === 'production';

module.exports = {
  entry: ['@babel/polyfill', './app/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: productionMode ? MiniCssExtractPlugin.loader : 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  mode: productionMode ? 'production' : 'development',
  devtool: productionMode ? 'source-map' : 'cheap-source-map',
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      meta: {
        title: metaData.title,
        description: metaData.description,
        domain: metaData.domain,
      },
    }),
    new MiniCssExtractPlugin({
      filename: productionMode ? '[name].[hash].css' : '[name].css',
      chunkFilename: productionMode ? '[id].[hash].css' : '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(pathsToClean),
    new CopyWebpackPlugin([{ from: 'app/icons/' }, { from: 'app/.htaccess' }]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // remove unused locale - saves 200kb
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            collapse_vars: false,
          },
        },
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: { sourcemap: true },
        canPrint: true,
      }),
    ],
  },
};
