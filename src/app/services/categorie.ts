import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({ providedIn: 'root' })
export class Categorie {
  private readonly http = inject(HttpClient);
  private readonly url = 'assets/data/categorie.json';

  getCategorie(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url);
  }

  getCategoriaBySlug(slug: string): Observable<Categoria | undefined> {
    return this.http
      .get<Categoria[]>(this.url)
      .pipe(map((categorie) => categorie.find((c) => c.slug === slug)));
  }
}
