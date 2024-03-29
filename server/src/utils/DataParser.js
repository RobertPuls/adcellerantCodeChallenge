const fs = require('fs');
const { parse } = require('fast-csv');

const path = require('path');

const AdDataEntry = require('../models/adDataEntry');
const ProductDataEntry = require('../models/productDataEnrty');
const SourceDataEntry = require('../models/sourceDataEntry');

// TODO: find better way of doing this without repeating stuff
module.exports = class DataParser {
  static parseAdFile(targetFile) {
    // derive global per-file variables
    const fileName = path.basename(targetFile, '.csv');
    const source = fileName.substring(0, fileName.indexOf('_'));

    const date = fileName.substring(fileName.indexOf('_') + 1).replace(/_/gi, '-');

    try {
      const stream = fs.createReadStream(targetFile);
      const csvData = [];
      const csvStream = parse()
        .on('data', (data) => {
          csvData.push(data);
        })
        .on('end', () => {
          csvData.shift();

          csvData.forEach(async (row) => {
            const product = row[0];
            const clicks = row[1];
            const adDataEntry = new AdDataEntry({
              source,
              product,
              clicks,
              date,
            });

            await adDataEntry.save();
          });
        });

      stream.pipe(csvStream);
      // eslint-disable-next-line no-console
      console.log(`processed: ${targetFile}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  static parseSourceFile(targetFile) {
    try {
      const stream = fs.createReadStream(targetFile);
      const csvData = [];
      const csvStream = parse()
        .on('data', (data) => {
          csvData.push(data);
        })
        .on('end', () => {
          // remove the first line: header
          csvData.shift();

          csvData.forEach(async (row) => {
            const source = row[0];

            const sourceDataEntry = new SourceDataEntry({
              source,
            });

            await sourceDataEntry.save();
          });
        });

      stream.pipe(csvStream);
      // eslint-disable-next-line no-console
      console.log(`processed: ${targetFile}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  static parseProductFile(targetFile) {
    try {
      const stream = fs.createReadStream(targetFile);
      const csvData = [];
      const csvStream = parse()
        .on('data', (data) => {
          csvData.push(data);
        })
        .on('end', () => {
          // remove the first line: header
          csvData.shift();

          csvData.forEach(async (row) => {
            const product = row[0];

            const productDataEntry = new ProductDataEntry({
              product,
            });

            await productDataEntry.save();
          });
        });

      stream.pipe(csvStream);
      // eslint-disable-next-line no-console
      console.log(`processed: ${targetFile}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};
