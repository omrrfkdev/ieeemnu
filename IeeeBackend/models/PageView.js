const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PageView', pageViewSchema);
