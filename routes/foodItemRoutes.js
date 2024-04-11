// routes/foodItemRoutes.js
import express from 'express';
import passport from 'passport';
import { createFoodItem, getFoodItems, getFoodItemById, updateFoodItem, deleteFoodItem } from '../controllers/foodItemController.js';

const router = express.Router();

// Route to create a new food item
router.post('/food-items', passport.authenticate('jwt', { session: false }), createFoodItem);

// Route to get all food items
router.get('/food-items', passport.authenticate('jwt', { session: false }), getFoodItems);

// Route to get a food item by ID
router.get('/food-items/:id', passport.authenticate('jwt', { session: false }), getFoodItemById);

// Route to update a food item by ID
router.put('/food-items/:id', passport.authenticate('jwt', { session: false }), updateFoodItem);

// Route to delete a food item by ID
router.delete('/food-items/:id', passport.authenticate('jwt', { session: false }), deleteFoodItem);

export default router;
