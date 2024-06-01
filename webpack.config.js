import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import path from 'path';
import {fileURLToPath} from 'url';
import LogEntryPlugin from './log-entries-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const cssRules = {
  test: /\.(sass|scss|css)$/,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    { loader: 'postcss-loader' },
    { loader: 'css-loader', options: {
        importLoaders: 2,
        sourceMap: false,
        modules: false
    }},
    { loader: 'sass-loader' }
  ]
};

const javascriptRules = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
};

const stylesheetsConfig = {
  cache: { type: 'memory' },
  mode: 'production',
  entry: {
      stylesheets: './src/stylesheets/test.scss',
      main: './src/entry.js'
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
  },
  module: {
    rules: [
      javascriptRules,
      cssRules,
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(),
    new LogEntryPlugin({ entry: './src/entry.js' })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin()
    ],
    mangleExports: 'size',
  }
};

export default stylesheetsConfig;