const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import DB to trigger connection check
require('./config/db');

const productRoutes = require('./routes/product.routes');

// ============================================================================
// PHASE A - Task A.5 : Enregistrement mta3 categoryRoutes
// ============================================================================
const categoryRoutes = require('./routes/category.routes');

const app = express();

// ── Security ───────────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ───────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Body Parsers ───────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── HTTP Logging ───────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ── Health Check ───────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ── API Routes ─────────────────────────────────────────────────────────────
app.use('/api/products', productRoutes);

// Task A.5 : N9olou l Express ay requête tabda b /api/categories 3addiha l categoryRoutes
app.use('/api/categories', categoryRoutes);

// ── 404 Handler ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found` });
});

// ── Global Error Handler (Task A.6 : Gestion des erreurs & Doublons 409) ────
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error('❌ Error:', err);

  // Task A.6 : Handle MySQL duplicate entry (409 Conflict)
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ success: false, message: 'Duplicate entry: une catégorie avec ce nom existe déjà.' });
  }

  // Handle MySQL FK constraint
  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({ success: false, message: 'Invalid reference: the related resource does not exist.' });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

module.exports = app;
