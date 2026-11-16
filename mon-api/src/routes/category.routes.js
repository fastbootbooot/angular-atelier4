const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const { validateCategory } = require('../middlewares/validate.middleware');

// ============================================================================
// HEDHA EL ROUTES : Police el circulation mta3 Express
// Y9ol l Express kol URL chkoun ychiddha :
// GET, POST, PUT, DELETE win yemchiw w chkoun el 3asses (middleware) elli y3as 3lihom
// ============================================================================

// 1. GET /api/categories -> Y3ayet lel controller.getAll
router.get('/', controller.getAll);

// 2. GET /api/categories/:id -> Y3ayet lel controller.getOne
router.get('/:id', controller.getOne);

// 3. POST /api/categories -> Y3addiha 3la validateCategory (Joi) 9bal, ken s7i7a yod5el l controller.store
router.post('/', validateCategory, controller.store);

// 4. PUT /api/categories/:id -> Y3addiha zeda 3la validateCategory 9bal ma ybaddel fi controller.update
router.put('/:id', validateCategory, controller.update);

// 5. DELETE /api/categories/:id -> Y3ayet lel controller.destroy
router.delete('/:id', controller.destroy);

module.exports = router;
