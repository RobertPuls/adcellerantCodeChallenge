/* eslint-disable no-console */
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

const AdDataParser = require('./AdDataParser');

module.exports = class Observer extends EventEmitter {
  constructor() {
    super();
    // TODO: See if there's a better way
    // this.targetFile = params;
  }

  // TODO: look at static function and this
  watchFile(targetFile) {
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

        // process file
        AdDataParser.parseFile(filePath);
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
