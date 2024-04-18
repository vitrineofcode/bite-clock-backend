import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Mongoose User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

// Add a method to the User schema
userSchema.methods.generateAuthToken = function () {
  // 
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
  return token;
};

// Mongoose User model
const User = mongoose.model('User', userSchema);

// Export the User model and validateUser function
export { User };
