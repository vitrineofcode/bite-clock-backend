import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';
import authenticateJWT from '../middleware/authenticateJWT.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

// Route to logout a user
router.post('/logout', authenticateJWT, logoutUser);

export default router;
