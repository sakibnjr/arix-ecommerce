import { Router } from 'express';
import Product from '../models/Product.js';
import { z } from 'zod';
import { asyncHandler } from '../utils/asyncHandler.js';
import { requireAdmin } from '../utils/requireAdmin.js';

const router = Router();

// GET /api/products
router.get('/', asyncHandler(async (req, res) => {
  const { search, anime, category, sort, isNew, onSale } = req.query;
  const q = { isActive: true };
  if (search) {
    q.$or = [
      { name: new RegExp(search, 'i') },
      { anime: new RegExp(search, 'i') },
      { category: new RegExp(search, 'i') },
    ];
  }
  if (anime) q.anime = anime;
  if (category) q.category = category;
  if (isNew === 'true') q.isNew = true;
  if (onSale === 'true') {
    q.$or = [ ...(q.$or || []), { discount: { $gt: 0 } }, { $expr: { $gt: ['$originalPrice', '$price'] } } ];
  }

  const cursor = Product.find(q);
  switch (sort) {
    case 'price-low':
      cursor.sort({ price: 1 });
      break;
    case 'price-high':
      cursor.sort({ price: -1 });
      break;
    case 'name':
      cursor.sort({ name: 1 });
      break;
    case 'anime':
      cursor.sort({ anime: 1 });
      break;
  }

  const items = await cursor.limit(100).lean();
  res.json({ items });
}));

// GET /api/products/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Validate ObjectId format
  if (!id || id === 'undefined' || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(400).json({ error: 'Invalid product ID format' });
  }
  
  const item = await Product.findById(id).lean();
  if (!item) return res.status(404).json({ error: 'Product not found' });
  res.json({ item });
}));

// POST /api/products (basic seed/create)
const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.number().positive('Price must be positive'),
  originalPrice: z.number().positive().optional(),
  images: z.object({
    front: z.string().url().optional(),
    back: z.string().url().optional(),
    detail: z.string().url().optional()
  }).optional(),
  anime: z.enum(['Naruto', 'Jujutsu Kaisen', 'One Piece', 'Demon Slayer', 'Solo Leveling']).optional(),
  category: z.enum(['normal', 'drop-shoulder']).optional(),
  sizes: z.array(z.enum(['M', 'L', 'XL'])).optional(),
  isNew: z.boolean().optional(),
  discount: z.number().min(0).max(100).nullable().optional(),
});

router.post('/', requireAdmin, asyncHandler(async (req, res) => {
  const parsed = productSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const doc = await Product.create(parsed.data);
  res.status(201).json({ item: doc });
}));

// PUT /api/products/:id
router.put('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Validate ObjectId format
  if (!id || id === 'undefined' || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(400).json({ error: 'Invalid product ID format' });
  }
  
  const parsed = productSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const doc = await Product.findByIdAndUpdate(id, parsed.data, { new: true }).lean();
  if (!doc) return res.status(404).json({ error: 'Product not found' });
  res.json({ item: doc });
}));

// DELETE /api/products/:id
router.delete('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Validate ObjectId format
  if (!id || id === 'undefined' || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(400).json({ error: 'Invalid product ID format' });
  }
  
  const doc = await Product.findByIdAndDelete(id).lean();
  if (!doc) return res.status(404).json({ error: 'Product not found' });
  res.json({ ok: true });
}));

export default router;


