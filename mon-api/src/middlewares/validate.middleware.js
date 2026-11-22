const Joi = require('joi');

// ============================================================================
// PHASE A - Task A.1 : Validation Joi (src/middlewares/validate.middleware.js)
// ============================================================================

// Chourout mta3 el Product (7adhrin mel loul)
const productSchema = Joi.object({
  category_id: Joi.number().integer().positive().allow(null),
  name: Joi.string().max(150).required(),
  description: Joi.string().allow(null, ''),
  price: Joi.number().min(0).precision(2).required(),
  stock: Joi.number().integer().min(0).default(0),
  sku: Joi.string().max(50).allow(null, ''),
  image_url: Joi.string().uri().max(255).allow(null, ''),
  is_active: Joi.number().valid(0, 1).default(1),
});

const productUpdateSchema = productSchema.fork(
  ['name', 'price'],
  (field) => field.optional()
);

// Task A.1 : Chourout el Catégorie (esm obligatoire, bin 2 w 100 7arf)
const categorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
});

// Fonction 3ama tthabet fi el données 7asb el schema elli na3tiwha
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    // Ken famma ghalta nraj3ou erreur 400 w ma nkamlouch
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map((d) => d.message),
    });
  }
  // Ken kol chay s7i7 n9oloulou t3adda (next)
  req.body = value;
  next();
};

// Task A.1 : Exporter validateCategory lil POST w PUT
module.exports = {
  validateCreate: validate(productSchema),
  validateUpdate: validate(productUpdateSchema),
  validateCategory: validate(categorySchema), // El 3asses mta3 POST w PUT lel catégorie
};
