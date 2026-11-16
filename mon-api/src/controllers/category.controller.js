const Category = require('../models/category.model');
const asyncHandler = require('../utils/asyncHandler');
const { success, created, notFound } = require('../utils/response');

// ============================================================================
// HEDHA EL CONTROLLER : Howa el chef de cuisine mta3 les requêtes HTTP
// Yakhodh el talab (req), y3ayet lel Model (category.model.js),
// w yraja3 el réponse m3aha el status code el s7i7 (200, 201, 404, 409...)
// ============================================================================

/**
 * 1. GET /api/categories
 * Yjib les catégories lkol w yraja3 statut 200 OK
 */
const getAll = asyncHandler(async (req, res) => {
  const categories = await Category.findAll();
  return success(res, categories, 'Categories retrieved successfully');
});

/**
 * 2. GET /api/categories/:id
 * Ylawwej 3la catégorie bel ID :
 * - Ken l9aha : yraja3 200 OK m3a el catégorie
 * - Ken ma l9ahach : yraja3 404 Not Found
 */
const getOne = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return notFound(res, 'Category not found');
  return success(res, category, 'Category retrieved successfully');
});

/**
 * 3. POST /api/categories
 * Yzid catégorie jdida :
 * - req.body fih { name: "..." } elli t3ada deja 3al 3asses validateCategory
 * - Yraja3 201 Created
 * - Ken l'esm me3awed (doublon) : asyncHandler yhez el ghalta l app.js elli yraja3 409 Conflict
 */
const store = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  return created(res, category, 'Category created successfully');
});

/**
 * 4. PUT /api/categories/:id
 * Ybaddel esm catégorie mawjouda :
 * - Ythabet ken mawjouda 9bal (sinon 404)
 * - Ybadalha fel base w yraja3 200 OK m3a l'objet el jdid
 */
const update = asyncHandler(async (req, res) => {
  const existing = await Category.findById(req.params.id);
  if (!existing) return notFound(res, 'Category not found');
  const category = await Category.update(req.params.id, req.body);
  return success(res, category, 'Category updated successfully');
});

/**
 * 5. DELETE /api/categories/:id
 * Yfassakh catégorie :
 * - Ythabet ken tfaskhet bel s7i7 yraja3 200 OK
 * - Ken ma l9ahach yraja3 404 Not Found
 */
const destroy = asyncHandler(async (req, res) => {
  const deleted = await Category.remove(req.params.id);
  if (!deleted) return notFound(res, 'Category not found');
  return success(res, null, 'Category deleted successfully');
});

module.exports = { getAll, getOne, store, update, destroy };
