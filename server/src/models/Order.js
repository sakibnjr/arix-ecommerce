import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    anime: String,
    category: String,
    size: String,
    price: Number,
    originalPrice: Number,
    quantity: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNo: { type: String, required: true, unique: true, index: true },
    orderType: { type: String, enum: ['cart', 'single'], default: 'cart' },
    customer: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      postalCode: String,
      notes: String,
    },
    items: [orderItemSchema],
    totals: {
      itemsCount: Number,
      subtotal: Number,
      shipping: Number,
      total: Number,
    },
    status: { type: String, enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'placed' },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);


