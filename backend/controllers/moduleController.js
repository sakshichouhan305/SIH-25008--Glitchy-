import Module from '../models/modules.model.js';

// Helper for consistent response format
const sendResponse = (res, statusCode, success, message, data = null) => {
    return res.status(statusCode).json({
        success,
        message,
        data
    });
};

// Simple logger helper
const log = {
    info: (...args) => console.info(new Date().toISOString(), '[moduleController]', ...args),
    debug: (...args) => console.debug(new Date().toISOString(), '[moduleController]', ...args),
    error: (...args) => console.error(new Date().toISOString(), '[moduleController]', ...args)
};

// Create a new module
export const createModule = async (req, res) => {
    const start = Date.now();
    log.info('createModule called');
    try {
        const { title, description, allowedDistricts, level } = req.body;
        log.debug('payload', { title: title?.slice(0, 100), level, allowedDistrictsCount: Array.isArray(allowedDistricts) ? allowedDistricts.length : 0, user: req.user?.id });

        // Enhanced input validation
        if (!title?.trim()) {
            log.info('Validation failed: missing title');
            return sendResponse(res, 400, false, 'Title is required');
        }

        if (level && !['beginner', 'intermediate', 'advanced'].includes(level)) {
            log.info('Validation failed: invalid level', level);
            return sendResponse(res, 400, false, 'Invalid level specified');
        }

        // Sanitize districts array
        const cleanDistricts = Array.isArray(allowedDistricts) 
            ? allowedDistricts.map(d => String(d).trim()).filter(Boolean)
            : [];

        const module = await Module.create({
            title: title.trim(),
            description: description?.trim() || '',
            allowedDistricts: cleanDistricts,
            level: level || 'beginner',
            createdBy: req.user.id
        });

        log.info('Module created', { id: module._id, title: module.title, createdBy: module.createdBy });
        log.debug('createModule finished', `elapsed=${Date.now()-start}ms`);
        return sendResponse(res, 201, true, 'Module created successfully', module);
    } catch (error) {
        log.error('Create module error:', error);
        return sendResponse(res, 500, false, 'Internal server error');
    }
};

// Get all modules
export const getAllModules = async (req, res) => {
    const start = Date.now();
    const { page = 1, limit = 10, search } = req.query;
    log.info('getAllModules called', { page, limit, search });
    try {
        const query = search 
            ? { title: { $regex: search, $options: 'i' } }
            : {};

        const modules = await Module.find(query)
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Module.countDocuments(query);
        log.debug('getAllModules fetched', { count: modules.length, total, elapsed: `${Date.now()-start}ms` });

        return sendResponse(res, 200, true, 'Modules fetched successfully', {
            modules,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            total
        });
    } catch (error) {
        log.error('Get modules error:', error);
        return sendResponse(res, 500, false, 'Internal server error');
    }
};

// Get module by ID
export const getModuleById = async (req, res) => {
    const start = Date.now();
    const id = req.params.id;
    log.info('getModuleById called', { id });
    try {
        const module = await Module.findById(id)
            .populate('createdBy', 'name email');

        if (!module) {
            log.info('Module not found', { id });
            return sendResponse(res, 404, false, 'Module not found');
        }

        log.debug('getModuleById success', { id, elapsed: `${Date.now()-start}ms` });
        return sendResponse(res, 200, true, 'Module fetched successfully', module);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            log.warn('Invalid ObjectId in getModuleById', { id, error: error.message });
            return sendResponse(res, 400, false, 'Invalid module ID');
        }
        log.error('Get module error:', error);
        return sendResponse(res, 500, false, 'Internal server error');
    }
};

// Get modules by level
export const getModulesByLevel = async (req, res) => {
    const start = Date.now();
    const { level } = req.params;
    const { page = 1, limit = 10 } = req.query;
    log.info('getModulesByLevel called', { level, page, limit });
    try {
        if (!['beginner', 'intermediate', 'advanced'].includes(level)) {
            log.info('Invalid level specified', level);
            return sendResponse(res, 400, false, 'Invalid level specified');
        }

        const modules = await Module.find({ level })
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Module.countDocuments({ level });

        log.debug('getModulesByLevel fetched', { count: modules.length, total, elapsed: `${Date.now()-start}ms` });
        return sendResponse(res, 200, true, 'Modules fetched successfully', {
            modules,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            total
        });
    } catch (error) {
        log.error('Get modules by level error:', error);
        return sendResponse(res, 500, false, 'Internal server error');
    }
};

// Update module
export const updateModule = async (req, res) => {
    const start = Date.now();
    const { id } = req.params;
    const updates = req.body;
    log.info('updateModule called', { id, updatesSummary: Object.keys(updates), user: req.user?.id });

    try {
        if (updates.level && !['beginner', 'intermediate', 'advanced'].includes(updates.level)) {
            log.info('Invalid level in update', updates.level);
            return sendResponse(res, 400, false, 'Invalid level specified');
        }

        const module = await Module.findById(id);
        if (!module) {
            log.info('Module not found for update', { id });
            return sendResponse(res, 404, false, 'Module not found');
        }

        if (module.createdBy.toString() !== req.user.id) {
            log.warn('Unauthorized update attempt', { moduleId: id, user: req.user?.id });
            return sendResponse(res, 403, false, 'Not authorized to update this module');
        }

        if (updates.allowedDistricts) {
            updates.allowedDistricts = Array.isArray(updates.allowedDistricts)
                ? updates.allowedDistricts.map(d => d.trim()).filter(Boolean)
                : [];
        }

        const updatedModule = await Module.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        ).populate('createdBy', 'name email');

        log.info('Module updated', { id, updatedBy: req.user?.id, elapsed: `${Date.now()-start}ms` });
        return sendResponse(res, 200, true, 'Module updated successfully', updatedModule);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            log.warn('Invalid ObjectId in updateModule', { id, error: error.message });
            return sendResponse(res, 400, false, 'Invalid module ID');
        }
        log.error('Update module error:', error);
        return sendResponse(res, 500, false, 'Internal server error');
    }
};

// Delete module
export const deleteModule = async (req, res) => {
    const start = Date.now();
    const { id } = req.params;
    log.info('deleteModule called', { id, user: req.user?.id });
    try {
        const module = await Module.findById(id);
        if (!module) {
            log.info('Module not found for delete', { id });
            return sendResponse(res, 404, false, 'Module not found');
        }

        if (module.createdBy.toString() !== req.user.id) {
            log.warn('Unauthorized delete attempt', { moduleId: id, user: req.user?.id });
            return sendResponse(res, 403, false, 'Not authorized to delete this module');
        }

        await Module.findByIdAndDelete(id);
        log.info('Module deleted', { id, deletedBy: req.user?.id, elapsed: `${Date.now()-start}ms` });
        return sendResponse(res, 200, true, 'Module deleted successfully');
    } catch (error) {
        if (error.kind === 'ObjectId') {
            log.warn('Invalid ObjectId in deleteModule', { id, error: error.message });
            return sendResponse(res, 400, false, 'Invalid module ID');
        }
        log.error('Delete module error:', error);
        return sendResponse(res, 500, false, 'Internal server error');
    }
};
