import { Router } from 'express';
import mongoose from 'mongoose';
import Slider from '../models/Slider.js';
import { z } from 'zod';
import { asyncHandler } from '../utils/asyncHandler.js';
import { requireAdmin } from '../utils/requireAdmin.js';

const router = Router();

// Validation schema for slider
const sliderSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  image: z.string().url('Valid image URL is required'),
  order: z.number().int().min(0, 'Order must be a positive integer'),
  isActive: z.boolean().optional(),

});

// GET /api/sliders - Get all active sliders ordered by order
router.get('/', asyncHandler(async (req, res) => {
  const sliders = await Slider.find({ isActive: true })
    .sort({ order: 1 })
    .lean();
  res.json({ items: sliders });
}));

// GET /api/sliders/all - Get all sliders (admin use)
router.get('/all', requireAdmin, asyncHandler(async (req, res) => {
  const sliders = await Slider.find()
    .sort({ order: 1 })
    .lean();
  res.json({ items: sliders });
}));

// GET /api/sliders/:id - Get single slider
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid slider ID' });
  }
  
  const slider = await Slider.findById(id).lean();
  if (!slider) {
    return res.status(404).json({ error: 'Slider not found' });
  }
  
  res.json({ item: slider });
}));

// POST /api/sliders - Create new slider
router.post('/', requireAdmin, asyncHandler(async (req, res) => {
  const parsed = sliderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  
  const doc = await Slider.create(parsed.data);
  res.status(201).json({ item: doc });
}));

// PUT /api/sliders/reorder - Reorder multiple sliders (must be declared before /:id PUT)
router.put('/reorder', requireAdmin, asyncHandler(async (req, res) => {
  const { sliders } = req.body;
  
  if (!Array.isArray(sliders)) {
    return res.status(400).json({ error: 'Sliders array is required' });
  }
  
  const updatePromises = sliders.map(({ id, order }) => 
    Slider.findByIdAndUpdate(id, { order }, { new: true })
  );
  
  const updatedSliders = await Promise.all(updatePromises);
  res.json({ items: updatedSliders });
}));

// PUT /api/sliders/:id - Update slider
router.put('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid slider ID' });
  }
  
  const parsed = sliderSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  
  const doc = await Slider.findByIdAndUpdate(id, parsed.data, { new: true }).lean();
  if (!doc) {
    return res.status(404).json({ error: 'Slider not found' });
  }
  
  res.json({ item: doc });
}));

// DELETE /api/sliders/:id - Delete slider
router.delete('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid slider ID' });
  }
  
  const doc = await Slider.findByIdAndDelete(id);
  if (!doc) {
    return res.status(404).json({ error: 'Slider not found' });
  }
  
  res.json({ message: 'Slider deleted successfully' });
}));

// (reorder route moved above the /:id PUT to avoid route matching conflicts)

export default router;
