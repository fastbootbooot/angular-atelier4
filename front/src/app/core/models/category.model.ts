// ============================================================================
// PHASE B - Task B.1 : Modèle TypeScript (Interfaces mta3 el Catégorie)
// ============================================================================

// 1. Chnowa fi wost el Catégorie wa7da ? (+ products_count lil bonus C.1)
export interface Category {
  id: number;              // El numéro unique mte3ha (ex: 1)
  name: string;            // Esm el catégorie (ex: "Smartphones")
  products_count?: number; // Phase C.1 : 9adeh feha men produit
}

// 2. Chnowa trajja3 l'API ki notlbou liste mta3 catégories (GET /api/categories) ?
export interface CategoryListResponse {
  success: boolean;        // true walla false
  message: string;         // "Categories retrieved successfully"
  data: Category[];        // Tableau fih les catégories lkol
}

// 3. Chnowa trajja3 l'API ki nzidou walla njibou catégorie wa7da (POST walla GET /:id) ?
export interface CategoryResponse {
  success: boolean;        // true walla false
  message: string;         // message de confirmation
  data: Category;          // El catégorie wa7da barka
}
