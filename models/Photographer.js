import { Schema, model } from 'mongoose';

// Define Photographer Schema
const photographerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // Converts email to lowercase
  },
  assignedEvents: [{
    type: String,
    trim: true,
    // You can add more validations based on your event schema or requirements
  }],
}, {
  timestamps: true,
});

// Create Photographer model
const Photographer = model('Photographer', photographerSchema);

export default Photographer;
