import jwt from 'jsonwebtoken';
import "dotenv/config";

// add logger
const log = {
  info: (...args) => console.info(new Date().toISOString(), "[authMiddleware]", ...args),
  warn: (...args) => console.warn(new Date().toISOString(), "[authMiddleware]", ...args),
  error: (...args) => console.error(new Date().toISOString(), "[authMiddleware]", ...args),
};

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        log.debug && log.debug("authMiddleware called", { path: req.originalUrl, method: req.method });

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            log.warn("authMiddleware - missing or invalid Authorization header", { ip: req.ip });
            return res.status(401).json({
                success: false,
                message: 'Authorization token required'
            });
        }

        const token = authHeader.split(' ')[1];
        
        if (!token) {
            log.warn("authMiddleware - token missing after Bearer");
            return res.status(401).json({
                success: false,
                message: 'Authorization token required'
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            log.info("authMiddleware - token verified", { userId: decoded.id, role: decoded.role });
            next();
        } catch (error) {
            log.warn("authMiddleware - invalid or expired token", { error: error.message });
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
    } catch (error) {
        log.error('Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Authentication error'
        });
    }
};

export default authMiddleware;