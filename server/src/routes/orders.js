import { Router } from 'express';
import { customAlphabet } from 'nanoid';
import Order from '../models/Order.js';
import { z } from 'zod';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
const genId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

// GET /api/orders (list)
router.get('/', asyncHandler(async (req, res) => {
  const { status, limit = 50 } = req.query;
  const q = {};
  if (status) q.status = status;
  const items = await Order.find(q).sort({ createdAt: -1 }).limit(Math.min(Number(limit), 200)).lean();
  res.json({ items });
}));

// POST /api/orders
const orderSchema = z.object({
  orderType: z.enum(['cart', 'single']).default('cart'),
  customer: z.object({
    fullName: z.string(),
    email: z.string().email().optional().or(z.literal('')).optional(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    notes: z.string().optional().or(z.literal('')).optional(),
  }),
  items: z.array(z.object({
    productId: z.string().optional(),
    name: z.string(),
    anime: z.string().optional(),
    category: z.string().optional(),
    size: z.string().optional(),
    price: z.number(),
    originalPrice: z.number().optional().nullable(),
    quantity: z.number().int().positive(),
  })),
  totals: z.object({
    itemsCount: z.number().int().nonnegative(),
    subtotal: z.number().nonnegative(),
    shipping: z.number().nonnegative(),
    total: z.number().nonnegative(),
  })
});

router.post('/', asyncHandler(async (req, res) => {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const short = genId();
  const orderNo = `ARX${short}`;
  const doc = await Order.create({ orderNo, ...parsed.data });
  res.status(201).json({ orderNo: doc.orderNo, id: doc._id });
}));

// GET /api/orders/:orderNo
router.get('/:orderNo', asyncHandler(async (req, res) => {
  const doc = await Order.findOne({ orderNo: req.params.orderNo }).lean();
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json({ order: doc });
}));

// PATCH /api/orders/:orderNo (update status)
const statusSchema = z.object({ status: z.enum(['placed', 'processing', 'shipped', 'delivered', 'cancelled']) });
router.patch('/:orderNo', asyncHandler(async (req, res) => {
  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const doc = await Order.findOneAndUpdate(
    { orderNo: req.params.orderNo },
    { status: parsed.data.status },
    { new: true }
  ).lean();
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json({ order: doc });
}));

export default router;


