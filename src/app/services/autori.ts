import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Autore } from '../models/autore';

@Injectable({ providedIn: 'root' })
export class Autori {
  private readonly http = inject(HttpClient);
  private readonly url = 'assets/data/autori.json';

  getAutori(): Observable<Autore[]> {
    return this.http.get<Autore[]>(this.url);
  }

  getAutoreById(id: number): Observable<Autore | undefined> {
    return this.http.get<Autore[]>(this.url).pipe(map((autori) => autori.find((a) => a.id === id)));
  }
}
