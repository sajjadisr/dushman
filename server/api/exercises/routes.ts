import { Router } from 'express';
import { storage } from '../../storage';
import { requireAuth } from '../../middleware/auth';
import { NotFoundError, ValidationError } from '../../core/errors';
import { insertWorkoutSetSchema } from '@shared/schema';
import { z } from 'zod';

const router = Router();

// Get all exercises or filter by category
router.get('/', async (req, res) => {
  const { category } = req.query;
  const exercises = category && typeof category === 'string'
    ? await storage.getExercisesByCategory(category)
    : await storage.getAllExercises();
  res.json(exercises);
});

// Get workout sets for user
router.get('/sets', requireAuth, async (req, res) => {
  const { date } = req.query;
  const targetDate = date ? new Date(date as string) : undefined;
  
  const sets = await storage.getWorkoutSetsByUser(req.userId!, targetDate);
  const setsWithExercise = await Promise.all(
    sets.map(async (set) => {
      const exercise = await storage.getExercise(set.exerciseId);
      return { ...set, exercise };
    })
  );
  
  res.json(setsWithExercise);
});

// Create workout set
router.post('/sets', requireAuth, async (req, res) => {
  try {
    const data = insertWorkoutSetSchema.parse({
      ...req.body,
      userId: req.userId
    });
    
    // Verify exercise exists
    const exercise = await storage.getExercise(data.exerciseId);
    if (!exercise) {
      throw new NotFoundError('Exercise');
    }
    
    const set = await storage.createWorkoutSet(data);
    res.json({ ...set, exercise });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.errors);
    }
    throw error;
  }
});

// Delete workout set
router.delete('/sets/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  
  // Verify set exists and belongs to user
  const set = await storage.getWorkoutSet(id);
  if (!set) {
    throw new NotFoundError('Workout set');
  }
  if (set.userId !== req.userId) {
    throw new ValidationError('Not authorized to delete this set');
  }
  
  await storage.deleteWorkoutSet(id);
  res.json({ message: 'Set deleted successfully' });
});

export default router;