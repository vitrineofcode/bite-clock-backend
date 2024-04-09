import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    location: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;
