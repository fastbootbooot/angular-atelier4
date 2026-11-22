import { Component, signal, computed, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';

// ============================================================================
// PHASE B - Task B.3 : COMPOSANT CATEGORY-LIST (Version simple DSI2 🎓)
// + PHASE C - Bonus :
//   - C.1 : Compteur de produits associés
//   - C.2 : Protection à la suppression (alerte ken catégorie m3obya)
//   - C.3 : Recherche en temps réel avec Signals (searchTerm + filteredCategories)
// ============================================================================
@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmDialogComponent],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryListComponent implements OnInit {
  // Service elli yjib el données mel Backend Express
  private readonly categoryService = inject(CategoryService);

  // Boite de confirmation mta3 el suppression
  @ViewChild('confirmDialog') confirmDialog!: ConfirmDialogComponent;

  // Task B.3 : Signal fih el liste mta3 les catégories lkol
  categories = signal<Category[]>([]);

  // Phase C.3 : Signal fih el mot-clé de recherche
  searchTerm = signal<string>('');

  // Phase C.3 : Computed Signal yfaltra les catégories en temps réel
  filteredCategories = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.categories();
    return this.categories().filter(c => c.name.toLowerCase().includes(term));
  });

  // Task B.3 : Computed Signal ya7seb 9adeh famma men catégorie
  total = computed(() => this.categories().length);

  // Awel ma tat7al el page njibou les catégories
  ngOnInit() {
    this.load();
  }

  // 1. GET (Task B.3) : Njibou les catégories lkol mel base
  load() {
    this.categoryService.getAll().subscribe(res => {
      this.categories.set(res.data);
    });
  }

  // 2. POST (Task B.3) : Nzidou catégorie jdida
  add(name: string) {
    const cleanName = name.trim();
    if (!cleanName) return;

    this.categoryService.create({ name: cleanName }).subscribe({
      next: () => this.load(), // N3awdou nchargiw
      error: (err) => {
        // Task A.6 : Gestion doublon 409
        if (err.status === 409) alert('Erreur 409 : Catégorie mawjouda deja !');
        else alert('Erreur lors de l\'ajout');
      }
    });
  }

  // 3. PUT (Task B.3) : Nbadlou esm catégorie (boite modale prompt simple)
  edit(cat: Category) {
    const nouveauNom = prompt('Nouveau nom pour la catégorie :', cat.name);
    if (!nouveauNom || nouveauNom.trim() === cat.name) return;

    this.categoryService.update(cat.id, { name: nouveauNom.trim() }).subscribe({
      next: () => this.load(),
      error: (err) => {
        if (err.status === 409) alert('Erreur 409 : Esm mawjoud deja !');
        else alert('Erreur de modification');
      }
    });
  }

  // 4. DELETE (Task B.3 + Phase C.2) : Protection suppression ken catégorie m3obya
  delete(cat: Category) {
    // Phase C.2 : Ken feha des produits n5arjou alert w ma n5aliwhech tetfasa5
    const count = cat.products_count ?? 0;
    if (count > 0) {
      alert(`⚠️ Attention : La catégorie "${cat.name}" contient ${count} produit(s).\nImpossible de la supprimer tant qu'elle n'est pas vide !`);
      return;
    }

    // Ken fergha n7ellou el ConfirmDialog
    this.confirmDialog.open({
      title: 'Suppression',
      message: `Voulez-vous supprimer "${cat.name}" ?`,
      confirmLabel: 'Supprimer',
      cancelLabel: 'Annuler',
      onConfirm: () => {
        this.categoryService.delete(cat.id).subscribe({
          next: () => this.load(),
          error: (err) => alert(err.error?.message || 'Erreur lors de la suppression')
        });
      }
    });
  }
}

export { CategoryListComponent as CategoryList };
