import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    images: {
      front: { type: String }, // Front view of t-shirt
      back: { type: String },  // Back view of t-shirt
      detail: { type: String } // Zoomed detail view
    },
    anime: { 
      type: String, 
      enum: ['Naruto', 'Jujutsu Kaisen', 'One Piece', 'Demon Slayer', 'Solo Leveling'],
      required: true,
      index: true 
    },
    category: { 
      type: String, 
      enum: ['normal', 'drop-shoulder'],
      required: true,
      index: true 
    },
    sizes: [{ 
      type: String, 
      enum: ['M', 'L', 'XL'] 
    }],
    isNew: { type: Boolean, default: false },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    // meta
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

export default mongoose.models.Product || mongoose.model('Product', productSchema);
