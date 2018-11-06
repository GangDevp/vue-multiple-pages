const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const pkg = require('./package');
const runEnv = pkg.runEnv;
const devEntry = pkg.devEntry;
const proEntry = pkg.proEntry;
const devServer = pkg.devServer;

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: __dirname + '/app-index/index.html',
    chunks: ['index'],
  }),
  new HtmlWebpackPlugin({
    filename: 'video.html',
    template: __dirname + '/app-video/video.html',
    chunks: ['video'],
  })
];

const proPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: false
    }
  }),
  new CleanWebpackPlugin(['dist'])
];

const entryApp = runEnv === 'development' ? devEntry : proEntry;
const devtool = runEnv === 'development' ? 'inline-source-map' : 'none';
const plugins = runEnv === 'development' ? devPlugins : proPlugins;
plugins.push(new webpack.DefinePlugin({ 'process.env.NODE_ENV': `'${runEnv}'` }));

const resolvePath = folder => path.resolve(__dirname, folder);

module.exports = {
  entry: entryApp,
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: devServer,
  devtool: devtool,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
        include: [resolvePath('app-index'),resolvePath('app-video'), resolvePath('utils'), resolvePath('routes'), resolvePath('stores')]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
        include: [resolvePath('app-index'), resolvePath('app-video')]
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'scss'],
        exclude: /node_modules/,
        include: [resolvePath('app-index'), resolvePath('app-video')]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
        exclude: /node_modules/,
        include: [resolvePath('app-index'), resolvePath('app-video')]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [resolvePath('app-index'), resolvePath('app-video')]
      }
    ]
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'index': resolvePath('app-index'),
      'video': resolvePath('app-video'),
      'routes': resolvePath('routes'),
      'stores': resolvePath('stores'),
      'utils': resolvePath('utils')
    }
  }
};