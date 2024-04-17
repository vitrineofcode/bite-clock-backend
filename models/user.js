import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from 'config';
import passwordComplexity from 'joi-password-complexity';

// Password complexity options
const complexityOptions = {
  min: 8,
  max: 255,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
};

// Custom password schema with complexity validation
const passwordSchema = Joi.string().required().custom((value, helpers) => {
  const complexity = passwordComplexity(complexityOptions);
  const validationResult = complexity.validate(value);

  if (validationResult.error) {
    return helpers.error('any.invalid');
  }

  return value;
}, 'Password Complexity');

// Schema for validating user input
const userJoiSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: passwordSchema,
});

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

// Function to validate user input against the schema
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().valid().required(),
    email: Joi.string().valid().required(),
    password: Joi.string().valid().required()
  });
}

// Export the User model and validateUser function
export { User, validateUser };
