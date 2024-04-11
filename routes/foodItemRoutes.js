// routes/foodItemRoutes.js
import express from 'express';
import authenticateJWT from '../middleware/authenticateJWT.js'; 
import { createFoodItem, getFoodItems, getFoodItemById, updateFoodItem, deleteFoodItem } from '../controllers/foodItemController.js';

const router = express.Router();

// Route to create a new food item
router.post('/food-items', authenticateJWT, async (req, res, next) => {
  try {
    await createFoodItem(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to get all food items
router.get('/food-items', authenticateJWT, async (req, res, next) => {
  try {
    await getFoodItems(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to get a food item by ID
router.get('/food-items/:id', authenticateJWT, async (req, res, next) => {
  try {
    await getFoodItemById(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to update a food item by ID
router.put('/food-items/:id', authenticateJWT, async (req, res, next) => {
  try {
    await updateFoodItem(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to delete a food item by ID
router.delete('/food-items/:id', authenticateJWT, async (req, res, next) => {
  try {
    await deleteFoodItem(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
