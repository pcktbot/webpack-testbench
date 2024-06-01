import webpack from 'webpack';
import stylesheetsConfig from './webpack.config.js';

const compiler = webpack(stylesheetsConfig);

compiler.close(() => {
  console.log('Build complete');
});
