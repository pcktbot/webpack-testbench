import fs from 'fs';
import path from 'path';

class LogEntryPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('LogEntryPlugin', (compilation, callback) => {
      const entryFile = this.options.entry;
      const outputFile = path.join(
        compilation.options.output.path,
        compilation.options.output.filename
      );

      fs.readFile(entryFile, 'utf8', (err, entryData) => {
        if (err) {
          console.error('Error reading the entry file:', err);
        } else {
          console.log('***********[ Entry file contents ]***********\n', entryData);
        }

        fs.readFile(outputFile, 'utf8', (err, outputData) => {
          if (err) {
            console.error('***********[ Error reading file contents ]***********\n', err);
          } else {
            console.log('***********[ Output file contents ]***********\n\n', outputData);
          }
          callback();
        });
      });
    });

    compiler.hooks.done.tap('LogEntryPlugin', (stats) => {
      if (stats.hasErrors()) {
        console.error('Webpack compilation errors:', stats?.compilation.errors);
      }
    });
  }
}

export default LogEntryPlugin;
