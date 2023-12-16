import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const studioSchema = new Schema({
  _id: _Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  address: String,
  phone: String,
  email: String,
  managerId: {
    type: _Schema.Types.ObjectId,
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

export default model('Studios', studioSchema);
