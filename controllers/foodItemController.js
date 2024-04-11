// controllers/foodItemController.js
import FoodItem from '../models/foodItem.js';

// Controller function to create a new food item
export const createFoodItem = async (req, res) => {
  try {
    const newFoodItem = new FoodItem(req.body);
    await newFoodItem.save();
    res.status(201).json(newFoodItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to get all food items
export const getFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a food item by ID
export const getFoodItemById = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json(foodItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update a food item by ID
export const updateFoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json(foodItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete a food item by ID
export const deleteFoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.findByIdAndDelete(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};