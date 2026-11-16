import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, CategoryListResponse, CategoryResponse } from '../models/category.model';


// HEDHA EL SERVICE : El Bousstaji elli yotlob el backend Express (Port 3000)


@Injectable({ providedIn: 'root' })
export class CategoryService {
  // 1. Nchaddou el HttpClient b méthode jdida mta3 Angular (inject)
  private readonly http = inject(HttpClient);

  // 2. L'adresse mta3 el backend elli 5demneh fel mon-api
  private readonly baseUrl = 'http://localhost:3000/api/categories';

  /**
   * Yjib les catégories lkol (GET http://localhost:3000/api/categories)
   */
  getAll(): Observable<CategoryListResponse> {
    return this.http.get<CategoryListResponse>(this.baseUrl);
  }

  /**
   * Yjib catégorie wa7da bel ID mte3ha (GET /api/categories/:id)
   */
  getById(id: number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.baseUrl}/${id}`);
  }

  /**
   * Yba3ath catégorie jdida lel base (POST /api/categories m3a { name })
   */
  create(data: { name: string }): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.baseUrl, data);
  }

  /**
   * Ybaddel esm catégorie mawjouda (PUT /api/categories/:id)
   */
  update(id: number, data: { name: string }): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(`${this.baseUrl}/${id}`, data);
  }

  /**
   * Yfassakh catégorie (DELETE /api/categories/:id)
   */
  delete(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.baseUrl}/${id}`);
  }
}