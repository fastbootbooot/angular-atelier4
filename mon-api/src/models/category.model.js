const pool = require('../config/db');

// ============================================================================
// HEDHA EL MODEL : Howa el wa7id elli ye7ki direct m3a el base MySQL
// Ya3ni ay requête SQL (SELECT, INSERT, UPDATE, DELETE) lezem tkoun hna !
// ============================================================================

/**
 * 1. Njibou les catégories lkol mel base mratbin bel ordre alphabétique
 */
const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM categories ORDER BY name ASC');
  return rows;
};

/**
 * 2. Njibou catégorie wa7da barka 7asb el ID mte3ha (ken ma fammech traja3 null)
 */
const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
  return rows[0] || null;
};

/**
 * 3. Nzidou catégorie jdida fel base (INSERT)
 * W ba3d nraj3ou el objet elli tsn3 bel ID mte3ou (insertId)
 */
const create = async ({ name }) => {
  const [result] = await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);
  return findById(result.insertId);
};

/**
 * 4. Nbadlou esm catégorie mawjouda (UPDATE)
 */
const update = async (id, { name }) => {
  await pool.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
  return findById(id);
};

/**
 * 5. Nfas5ou catégorie mel base 7asb el ID mte3ha (DELETE)
 * affectedRows > 0 ma3neha tfaskhet bel s7i7
 */
const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
