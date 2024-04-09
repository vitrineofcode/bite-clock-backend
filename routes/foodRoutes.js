import express from 'express';
import FoodItem from '../models/FoodItem.js';

const router = express.Router();

// Get all food items for a user
router.get('/', async (req, res) => {
    try {
        const foodItems = await FoodItem.find({ user: req.user._id });
        res.status(200).json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new food item
router.post('/', async (req, res) => {
    const { name, quantity, location } = req.body;
    const foodItem = new FoodItem({
        name,
        quantity,
        location,
        user: req.user._id
    });

    try {
        const newFoodItem = await foodItem.save();
        res.status(201).json(newFoodItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a food item
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity, location } = req.body;

    try {
        const updatedFoodItem = await FoodItem.findByIdAndUpdate(id, {
            name,
            quantity,
            location
        }, { new: true });

        res.status(200).json(updatedFoodItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a food item
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await FoodItem.findByIdAndDelete(id);
        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
