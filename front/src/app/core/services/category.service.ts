import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, CategoryListResponse, CategoryResponse } from '../models/category.model';

// ============================================================================
// PHASE B - Task B.2 : Service Angular (Bousstaji elli ye7ki m3a el backend 3000)
// ============================================================================

@Injectable({ providedIn: 'root' })
export class CategoryService {
  // 1. Task B.2 : Injection moderne b inject(HttpClient)
  private readonly http = inject(HttpClient);

  // 2. L'adresse mta3 el backend elli 5demneh fel mon-api
  private readonly baseUrl = 'http://localhost:3000/api/categories';

  /**
   * Task B.2 : Yjib les catégories lkol (GET http://localhost:3000/api/categories)
   */
  getAll(): Observable<CategoryListResponse> {
    return this.http.get<CategoryListResponse>(this.baseUrl);
  }

  /**
   * Task B.2 : Yjib catégorie wa7da bel ID mte3ha (GET /api/categories/:id)
   */
  getById(id: number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.baseUrl}/${id}`);
  }

  /**
   * Task B.2 : Yba3ath catégorie jdida lel base (POST /api/categories)
   */
  create(data: { name: string }): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.baseUrl, data);
  }

  /**
   * Task B.2 : Ybaddel esm catégorie mawjouda (PUT /api/categories/:id)
   */
  update(id: number, data: { name: string }): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(`${this.baseUrl}/${id}`, data);
  }

  /**
   * Task B.2 : Yfassakh catégorie (DELETE /api/categories/:id)
   */
  delete(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.baseUrl}/${id}`);
  }
}
