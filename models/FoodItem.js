// models/foodItem.js
import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['fridge', 'shelf', 'pantry'],
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;
