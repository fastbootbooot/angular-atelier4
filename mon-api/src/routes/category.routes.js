const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const { validateCategory } = require('../middlewares/validate.middleware');

// ============================================================================
// PHASE A - Task A.4 : Police el circulation mta3 Express (Routes Catégories)
// ============================================================================

// 1. GET /api/categories -> Y3ayet lel controller.getAll
router.get('/', controller.getAll);

// 2. GET /api/categories/:id -> Y3ayet lel controller.getOne
router.get('/:id', controller.getOne);

// 3. POST /api/categories -> Y3addiha 3la validateCategory (Joi) 9bal, ba3d controller.store
router.post('/', validateCategory, controller.store);

// 4. PUT /api/categories/:id -> Y3addiha zeda 3la validateCategory 9bal, ba3d controller.update
router.put('/:id', validateCategory, controller.update);

// 5. DELETE /api/categories/:id -> Y3ayet lel controller.destroy
router.delete('/:id', controller.destroy);

module.exports = router;
