import mongoose from 'mongoose';

const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },

}, {
  timestamps: true
});

// Ensure order is unique when active
sliderSchema.index({ order: 1, isActive: 1 });

const Slider = mongoose.model('Slider', sliderSchema);

export default Slider;
