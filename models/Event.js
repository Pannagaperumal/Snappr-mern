import {Schema, model} from 'mongoose';


const Event = new Schema({
    _id: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Studios'
    },
    photographers: [{
      type: Schema.Types.ObjectId,
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