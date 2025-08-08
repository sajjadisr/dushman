import { Router } from 'express';
import { storage } from '../../storage';
import { requireAuth } from '../../middleware/auth';
import { NotFoundError, ValidationError } from '../../core/errors';
import { insertFoodEntrySchema } from '@shared/schema';
import { z } from 'zod';

const router = Router();

// Get all foods or search
router.get('/', async (req, res) => {
  const { search } = req.query;
  const foods = search && typeof search === 'string' 
    ? await storage.searchFoods(search)
    : await storage.getAllFoods();
  res.json(foods);
});

// Get food entries for user
router.get('/entries', requireAuth, async (req, res) => {
  const { date } = req.query;
  const targetDate = date ? new Date(date as string) : undefined;
  
  const entries = await storage.getFoodEntriesByUser(req.userId!, targetDate);
  const entriesWithFood = await Promise.all(
    entries.map(async (entry) => {
      const food = await storage.getFood(entry.foodId);
      return { ...entry, food };
    })
  );
  
  res.json(entriesWithFood);
});

// Create food entry
router.post('/entries', requireAuth, async (req, res) => {
  try {
    const data = insertFoodEntrySchema.parse({
      ...req.body,
      userId: req.userId
    });
    
    // Verify food exists
    const food = await storage.getFood(data.foodId);
    if (!food) {
      throw new NotFoundError('Food');
    }
    
    const entry = await storage.createFoodEntry(data);
    res.json({ ...entry, food });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.errors);
    }
    throw error;
  }
});

// Delete food entry
router.delete('/entries/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  
  // Verify entry exists and belongs to user
  const entry = await storage.getFoodEntry(id);
  if (!entry) {
    throw new NotFoundError('Food entry');
  }
  if (entry.userId !== req.userId) {
    throw new ValidationError('Not authorized to delete this entry');
  }
  
  await storage.deleteFoodEntry(id);
  res.json({ message: 'Entry deleted successfully' });
});

export default router;