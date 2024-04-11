// routes/foodItemRoutes.js
import express from 'express';
import { createFoodItem, getFoodItems, getFoodItemById, updateFoodItem, deleteFoodItem } from '../controllers/foodItemController.js';

const router = express.Router();

// Route to create a new food item
router.post('/food-items', createFoodItem);

// Route to get all food items
router.get('/food-items', getFoodItems);

// Route to get a food item by ID
router.get('/food-items/:id', getFoodItemById);

// Route to update a food item by ID
router.put('/food-items/:id', updateFoodItem);

// Route to delete a food item by ID
router.delete('/food-items/:id', deleteFoodItem);

export default router;
