const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = { type: String, required: true };

const adDataEntrySchema = new Schema({
  source: requiredString,
  product: requiredString,
  clicks: { type: Number, required: true },
  date: { type: Date, default: new Date(), required: true },
});

const AdDataEntry = mongoose.model('AdEntry', adDataEntrySchema);

module.exports = AdDataEntry;
