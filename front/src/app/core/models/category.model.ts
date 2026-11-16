
// HEDHA EL MOULE (INTERFACE) MTA3 EL CATÉGORIE


// 1. Chnowa fi wost el Catégorie wa7da ?
export interface Category {
  id: number;       // El numéro unique mte3ha (ex: 1)
  name: string;     // Esm el catégorie (ex: "Smartphones")
  products_count?: number; // (Optionnel lil bonus) 9adeh men produit feha
}

// 2. Chnowa trajja3 l'API ki notlbou liste mta3 catégories (GET /api/categories) ?
export interface CategoryListResponse {
  success: boolean;   // true walla false
  message: string;    // "Categories retrieved successfully"
  data: Category[];   // Tableau fih les catégories lkol [ {id: 1, name: "PC"}, ... ]
}

// 3. Chnowa trajja3 l'API ki nzidou walla njibou catégorie wa7da (POST walla GET /:id) ?
export interface CategoryResponse {
  success: boolean;   // true walla false
  message: string;    // message de confirmation
  data: Category;     // El catégorie wa7da barka { id: 1, name: "PC" }
}