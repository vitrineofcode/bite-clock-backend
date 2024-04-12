// import mongoose module
import mongoose from 'mongoose';

// Destructure Schema from the mongoose object
const { Schema, connect } = mongoose;

// Create a schema
const foodSchema = new Schema({
  foodName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    enum: ['fridge', 'freezer', 'pantry', 'shelf'],
    required: true
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now
  },
  expirationDate: {
    type: Date,
    required: true
  }
});

// Create a model
const Food = mongoose.model('Food', foodSchema);

// Export the model 
export default Food;