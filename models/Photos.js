const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const photoSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  filename: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true,
  },
  metadata: Schema.Types.Mixed, // Object for additional details
  faces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faces',
  }],
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Events',
  },
  photographerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Photos', photoSchema);
