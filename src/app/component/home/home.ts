import { Component, inject, OnInit, signal } from '@angular/core';
import { ArticoloCard } from '../shared/articolo-card/articolo-card';
import { Notizie } from '../../services/notizie';
import { Preferiti } from '../../services/preferiti';
import { Articolo } from '../../models/articolo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ArticoloCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly notizieService = inject(Notizie);
  preferitiService = inject(Preferiti);

  articoli = signal<Articolo[]>([]);
  caricamento = signal(true);

  ngOnInit(): void {
    this.notizieService.getArticoliOrdinatiPerData().subscribe({
      next: (data) => {
        this.articoli.set(data);
        this.caricamento.set(false);
      },
      error: (err) => {
        console.error('Errore nel caricamento articoli:', err);
        this.caricamento.set(false);
      },
    });
  }

  onTogglePreferito(articolo: Articolo): void {
    this.preferitiService.toggle(articolo);
  }
}
