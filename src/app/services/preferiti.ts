import { Injectable, signal, computed } from '@angular/core';
import { Articolo } from '../models/articolo';

@Injectable({ providedIn: 'root' })
export class Preferiti {
  private readonly _preferiti = signal<Articolo[]>([]);

  preferiti = this._preferiti.asReadonly();
  totalePreferiti = computed(() => this._preferiti().length);

  aggiungi(articolo: Articolo): void {
    if (!this.isPreferito(articolo.id)) {
      this._preferiti.update((list) => [...list, articolo]);
    }
  }

  rimuovi(id: number): void {
    this._preferiti.update((list) => list.filter((a) => a.id !== id));
  }

  toggle(articolo: Articolo): void {
    this.isPreferito(articolo.id) ? this.rimuovi(articolo.id) : this.aggiungi(articolo);
  }

  isPreferito(id: number): boolean {
    return this._preferiti().some((a) => a.id === id);
  }
}
