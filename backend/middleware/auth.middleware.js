import jwt from 'jsonwebtoken';
import "dotenv/config";

const authMiddleware = (req, res, next) => {
    const token = getTokenFromHeader(req);
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token here (using JWT or your preferred method)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const getTokenFromHeader = (req) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    return null;
}

export default authMiddleware;