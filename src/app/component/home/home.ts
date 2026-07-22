import { Component, inject, OnInit, signal } from '@angular/core';
import { ArticoloCard } from '../shared/articolo-card/articolo-card';
import { Notizie } from '../../services/notizie';
import { Articolo } from '../../models/articolo';

@Component({
  selector: 'app-home',
  imports: [ArticoloCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly notizieService = inject(Notizie);

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
}
