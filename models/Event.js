import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Creates a new Event schema with the specified properties.
 * @param {string} name - The name of the event.
 * @param {string} event_id - The unique id of the event.
 * @param {string} description - A description of the event.
 * @param {Date} startDate - The start date of the event.
 * @param {Date} endDate - The end date of the event.
 * @param {string} location - The location of the event.
 * @param {ObjectId} studioId - The id of the studio that hosts the event.
 * @param {ObjectId[]} photographers - The ids of the photographers who took photos at the event.
 * @returns {Event} The new Event schema.
 */


const Event = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    event_id:{
        type:String,
        required:true
    },
    description: String,
    startDate: {
      type: Date,
      required: false
    },
    endDate: {
      type: Date,
      required: true
    },
    location: String,
    studioId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Studios'
    },
    photographers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  
export default Event;