/* eslint-disable no-console */
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

const DataParser = require('./DataParser');
const { fileTypes } = require('../consts/consts');

module.exports = class Observer extends EventEmitter {
  // TODO: look at static function and this
  // TODO: rename targetFile to targetDir
  // TODO: find a better way than filetype. Maybe get it from the end of the path.
  // eslint-disable-next-line class-methods-use-this
  watchFile(targetFile, fileType) {
    try {
      console.log(
        `[${new Date().toLocaleString()}] Watching for file changes on: ${targetFile}`,
      );
      const watcher = chokidar.watch(targetFile, {
        persistent: true,
        // depth: 0,
      });

      watcher.on('add', async (filePath) => {
        console.log(filePath);
        const filename = path.basename(filePath);
        const directory = path.dirname(filePath);

        // TODO: see if you can di this a better way
        // process file
        if (fileType === fileTypes.AD) {
          DataParser.parseAdFile(filePath);
        } else if (fileType === fileTypes.SOURCE) {
          DataParser.parseSourceFile(filePath);
        } else if (fileType === fileTypes.PRODUCT) {
          DataParser.parseProductFile(filePath);
        } else {
          console.log('Invalid fileType');
        }
        // move file
        const newPath = `${directory}/processed/${filename}`;
        fs.rename(filePath, newPath, (err) => {
          if (err) {
            console.warn(err);
          }
          console.log(`Successfully parsed ${filename}`);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
};
