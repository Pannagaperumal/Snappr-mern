const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @typedef Studio
 * @property {string} _id - The unique ID of the studio.
 * @property {string} name - The name of the studio.
 * @property {string} [address] - The address of the studio.
 * @property {string} [phone] - The phone number of the studio.
 * @property {string} [email] - The email of the studio.
 * @property {string} managerId - The ID of the manager of the studio.
 * @property {Date} createdAt - The date the studio was created.
 * @property {Date} updatedAt - The date the studio was last updated.
 */

const studioSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  address: String,
  phone: String,
  email: String,
  managerId: {
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

module.exports = mongoose.model('Studios', studioSchema);
