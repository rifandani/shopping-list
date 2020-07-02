const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const Schema = mongoose.Schema;

// create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Mohon tambahkan teks'],
  },
  price: {
    type: Number,
    required: [true, 'Mohon tambahkan angka'],
  },
});

// buat kolom created_at dan updated_at
ItemSchema.plugin(timestamp);

// model Item == collection items
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
