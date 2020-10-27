const fs = require('fs');
const { parse } = require('fast-csv');

const path = require('path');
const AdDataEntry = require('../models/adDataEntry');

module.exports = class AdDataParser {
  static parseFile(targetFile) {
    // derive global per-file variables
    const fileName = path.basename(targetFile, '.csv');
    const source = fileName.substring(0, fileName.indexOf('_'));
    // TODO: put regex in var
    const date = fileName.substring(fileName.indexOf('_') + 1).replace(/_/gi, '-');

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
            // todo: this works with sample data...
            // a more scalable solution would be to provide a UI
            // and the ability for maps of file definitions
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
      console.log(`processed: ${targetFile}`);
    } catch (error) {
      console.log(error);
    }
  }
}
