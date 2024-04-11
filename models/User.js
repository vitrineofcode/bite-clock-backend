// models/user.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  foodInventory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodItem'
  }]
});

const User = mongoose.model('User', userSchema);

export default User;
