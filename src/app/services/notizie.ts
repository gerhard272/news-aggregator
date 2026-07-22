import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Articolo } from '../models/articolo';

@Injectable({ providedIn: 'root' })
export class Notizie {
  private readonly http = inject(HttpClient);
  private readonly url = 'assets/data/articoli.json';

  getArticoli(): Observable<Articolo[]> {
    return this.http.get<Articolo[]>(this.url);
  }

  getArticoloById(id: number): Observable<Articolo | undefined> {
    return this.http
      .get<Articolo[]>(this.url)
      .pipe(map((articoli) => articoli.find((a) => a.id === id)));
  }

  getArticoliPerCategoria(categoria: string): Observable<Articolo[]> {
    return this.http
      .get<Articolo[]>(this.url)
      .pipe(map((articoli) => articoli.filter((a) => a.categoria === categoria)));
  }

  getArticoliPerAutore(autoreId: number): Observable<Articolo[]> {
    return this.http
      .get<Articolo[]>(this.url)
      .pipe(map((articoli) => articoli.filter((a) => a.autoreId === autoreId)));
  }

  getArticoliOrdinatiPerData(): Observable<Articolo[]> {
    return this.http
      .get<Articolo[]>(this.url)
      .pipe(
        map((articoli) =>
          [...articoli].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()),
        ),
      );
  }
}
