// models/doctor.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    availableDate: {
      type: Date,
      required: true,
    },
    availableTime: {
      type: String,
      required: true,
    },
    availableSlots: {
        type: Map,
        of: [String],
      },
    bookedSlots: {
        type: [String],
        default: [],
      },
      city: {
        type: [String],
        default: [],
      },
      description: {
        type: [String],
        default: [],
      },
      consultantFee: {
        type: [String],
        default: [],
      },
      experience: {         //newly added
        type: [String],
        default: [],
      },
      rating: {             //newly added 
        type: [String],
        default: [],
      },

      visingHours: {             //newly added 
        type: [String],
        default: [],
      },
  },
  { timestamps: true }
);

export default mongoose.model('Doctor', doctorSchema);
