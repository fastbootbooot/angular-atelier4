const pool = require('../config/db');

// ============================================================================
// PHASE A - Task A.2 : Modèle SQL (src/models/category.model.js)
// + PHASE C - 1 : Compteur de produits par catégorie
// ----------------------------------------------------------------------------
// HEDHA EL MODEL : Howa el wa7id elli ye7ki direct m3a el base MySQL
// Ya3ni ay requête SQL (SELECT, INSERT, UPDATE, DELETE) lezem tkoun hna !
// ============================================================================

/**
 * 1. Task A.2 & Phase C.1 : findAll()
 * Njibou les catégories lkol mel base mratbin bel ordre alphabétique
 * m3a 9adeh fehom men produit (products_count) b JOIN
 */
const findAll = async () => {
  const query = `
    SELECT c.*, COUNT(p.id) AS products_count
    FROM categories c
    LEFT JOIN products p ON c.id = p.category_id
    GROUP BY c.id
    ORDER BY c.name ASC
  `;
  const [rows] = await pool.query(query);
  return rows;
};

/**
 * 2. Task A.2 : findById(id)
 * Njibou catégorie wa7da barka 7asb el ID mte3ha (ken ma fammech traja3 null)
 */
const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
  return rows[0] || null;
};

/**
 * Phase C.2 : countProducts(id)
 * N7asbou 9adeh feha men produit bch ma nfas5ouhech ken m3obya
 */
const countProducts = async (categoryId) => {
  const [rows] = await pool.query(
    'SELECT COUNT(*) AS count FROM products WHERE category_id = ?',
    [categoryId]
  );
  return rows[0].count;
};

/**
 * 3. Task A.2 : create({ name })
 * Nzidou catégorie jdida fel base (INSERT)
 * W ba3d nraj3ou el objet elli tsn3 bel ID mte3ou (insertId)
 */
const create = async ({ name }) => {
  const [result] = await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);
  return findById(result.insertId);
};

/**
 * 4. Task A.2 : update(id, { name })
 * Nbadlou esm catégorie mawjouda (UPDATE)
 */
const update = async (id, { name }) => {
  await pool.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
  return findById(id);
};

/**
 * 5. Task A.2 : remove(id)
 * Nfas5ou catégorie mel base 7asb el ID mte3ha (DELETE)
 */
const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  findAll,
  findById,
  countProducts,
  create,
  update,
  remove,
};
