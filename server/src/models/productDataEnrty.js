const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = { type: String, required: true };

const productDataEntrySchema = new Schema({
  product: requiredString,
});

const ProductDataEntry = mongoose.model('ProductEntry', productDataEntrySchema);

module.exports = ProductDataEntry;
