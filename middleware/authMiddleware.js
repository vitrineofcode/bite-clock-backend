import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new Error('No user found');
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
};

export default authMiddleware;
