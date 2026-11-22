import { Component, signal, computed, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product, ProductFilters } from '../../../core/models/product.model';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ConfirmDialogComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  // 👁️ Feature "Voir Produits" : ActivatedRoute bch na9raw biha el query params (?category_id=X)
  private readonly route = inject(ActivatedRoute);
  @ViewChild('confirmDialog') confirmDialog!: ConfirmDialogComponent;

  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  toast = signal<{ message: string; type: 'success' | 'error' } | null>(null);

  searchQuery = signal('');
  statusFilter = signal<'' | '0' | '1'>('');
  // 👁️ Feature "Voir Produits" : Signal yched l'ID mta3 el catégorie mfiltrée (null ken n7ebbou nchoufou kol chay)
  categoryFilter = signal<number | null>(null);
  currentPage = signal(1);
  limit = signal(10);

  meta = signal({ total: 0, page: 1, limit: 10, totalPages: 0 });

  totalActive = signal(0);
  totalOutOfStock = signal(0);

  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  pages = computed(() => {
    const total = this.meta().totalPages;
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  ngOnInit() {
    // 👁️ Feature "Voir Produits" : Kol ma yetbadal el URL (ex: ?category_id=5), na9raw l'ID w nchargiw les produits mte3ha
    this.route.queryParams.subscribe(params => {
      if (params['category_id']) {
        this.categoryFilter.set(Number(params['category_id']));
      } else {
        this.categoryFilter.set(null);
      }
      this.currentPage.set(1);
      this.loadProducts();
      this.loadStats();
    });
  }

  loadProducts() {
    this.loading.set(true);
    this.error.set(null);
    const filters: ProductFilters = {
      page: this.currentPage(),
      limit: this.limit(),
    };
    if (this.searchQuery()) filters.search = this.searchQuery();
    if (this.statusFilter() !== '') filters.is_active = Number(this.statusFilter()) as 0 | 1;
    // 👁️ Feature "Voir Produits" : Nab3thou category_id lel Service ken mseleksyonya
    if (this.categoryFilter()) filters.category_id = this.categoryFilter()!;

    this.productService.getAll(filters).subscribe({
      next: (res) => {
        this.products.set(res.data);
        this.meta.set(res.meta);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Impossible de charger les produits.');
        this.loading.set(false);
      }
    });
  }

  loadStats() {
    this.productService.getAll({ page: 1, limit: 1, is_active: 1 }).subscribe({
      next: (res) => this.totalActive.set(res.meta.total)
    });
    this.productService.getAll({ page: 1, limit: 9999 }).subscribe({
      next: (res) => {
        const oos = res.data.filter(p => p.stock === 0).length;
        this.totalOutOfStock.set(oos);
      }
    });
  }

  onSearch(value: string) {
    this.searchQuery.set(value);
    if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
    this.searchDebounceTimer = setTimeout(() => {
      this.currentPage.set(1);
      this.loadProducts();
    }, 500);
  }

  onStatusFilter(value: '' | '0' | '1') {
    this.statusFilter.set(value);
    this.currentPage.set(1);
    this.loadProducts();
  }

  // 👁️ Feature "Voir Produits" : Bouton ✕ bch nna7iw el filtre w narj3ou nchoufou les produits lkol
  clearCategoryFilter() {
    this.categoryFilter.set(null);
    this.router.navigate(['/products']);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.meta().totalPages) return;
    this.currentPage.set(page);
    this.loadProducts();
  }

  viewProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  editProduct(id: number) {
    this.router.navigate(['/products', id, 'edit']);
  }

  deleteProduct(product: Product) {
    this.confirmDialog.open({
      title: 'Supprimer le produit',
      message: `Voulez-vous vraiment supprimer "${product.name}" ? Cette action est irréversible.`,
      confirmLabel: 'Supprimer',
      onConfirm: () => {
        this.productService.delete(product.id).subscribe({
          next: () => {
            this.showToast('Produit supprimé avec succès', 'success');
            this.loadProducts();
            this.loadStats();
          },
          error: () => this.showToast('Erreur lors de la suppression', 'error')
        });
      }
    });
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toast.set({ message, type });
    setTimeout(() => this.toast.set(null), 3500);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  }

  getImageUrl(product: Product): string {
    return product.image_url || 'https://placehold.co/400x300/6366f1/ffffff?text=' + encodeURIComponent(product.name);
  }

  trackById(_: number, p: Product) {
    return p.id;
  }
}
