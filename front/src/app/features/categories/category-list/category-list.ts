import { Component, signal, computed, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';

// ============================================================================
// COMPOSANT CATEGORY-LIST : Version simple 3al le5er mta3 taleb DSI2 🎓
// ============================================================================
@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmDialogComponent],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryListComponent implements OnInit {
  // Service elli yjib el données mel Backend
  private readonly categoryService = inject(CategoryService);

  // Boite de confirmation mta3 el suppression
  @ViewChild('confirmDialog') confirmDialog!: ConfirmDialogComponent;

  // Signal fih el liste mta3 les catégories
  categories = signal<Category[]>([]);

  // Computed Signal : ya7seb 9adeh famma men catégorie
  total = computed(() => this.categories().length);

  // Awel ma tat7al el page njibou les catégories
  ngOnInit() {
    this.load();
  }

  // 1. GET : Njibou les catégories lkol mel base
  load() {
    this.categoryService.getAll().subscribe(res => {
      this.categories.set(res.data);
    });
  }

  // 2. POST : Nzidou catégorie jdida
  add(name: string) {
    const cleanName = name.trim();
    if (!cleanName) return;

    this.categoryService.create({ name: cleanName }).subscribe({
      next: () => this.load(), // N3awdou nchargiw
      error: (err) => {
        if (err.status === 409) alert('Erreur 409 : Catégorie mawjouda deja !');
        else alert('Erreur lors de l\'ajout');
      }
    });
  }

  // 3. PUT : Nbadlou esm catégorie (boite modale prompt simple)
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

  // 4. DELETE : Nfas5ou catégorie bel boite ConfirmDialog
  delete(cat: Category) {
    this.confirmDialog.open({
      title: 'Suppression',
      message: `Voulez-vous supprimer "${cat.name}" ?`,
      confirmLabel: 'Supprimer',
      cancelLabel: 'Annuler',
      onConfirm: () => {
        this.categoryService.delete(cat.id).subscribe(() => this.load());
      }
    });
  }
}

export { CategoryListComponent as CategoryList };
