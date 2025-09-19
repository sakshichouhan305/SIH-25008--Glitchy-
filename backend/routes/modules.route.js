import express from 'express';
import { 
    createModule,
    getAllModules,
    getModuleById,
    updateModule,
    deleteModule,
    getModulesByLevel
} from '../controllers/moduleController.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllModules);
router.get('/level/:level', getModulesByLevel);
router.get('/:id', getModuleById);

// Protected routes (Admin only)
router.post('/', authMiddleware, roleMiddleware('admin'), createModule);
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateModule);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteModule);

export default router;
