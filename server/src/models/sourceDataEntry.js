const mongoose = require('mongoose');

const { Schema } = mongoose;

// TODO: pull out and put in const or defaults file
const requiredString = { type: String, required: true };

const sourceDataEntrySchema = new Schema({
  // TODO: maybe rename to sourceName
  source: requiredString,
});

const SourceDataEntry = mongoose.model('SourceEntry', sourceDataEntrySchema);

module.exports = SourceDataEntry;
