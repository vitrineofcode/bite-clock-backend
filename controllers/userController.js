// controllers/userController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import User from '../models/user.js';
import { secretKey } from '../config.js';

// Define a Joi schema for validating user inputs
const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().min(6),
});

// Function to register a new user
export const registerUser = async (req, res) => {
  // Validate the request body
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const { username, password } = value;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to log in a user
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to log out a user
export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};
