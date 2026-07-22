import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Preferiti as PreferitiService } from '../../services/preferiti';
import { ArticoloCard } from '../shared/articolo-card/articolo-card';
import { Articolo } from '../../models/articolo';

@Component({
  selector: 'app-preferiti',
  imports: [ArticoloCard, RouterLink],
  templateUrl: './preferiti.html',
  styleUrl: './preferiti.css',
})
export class Preferiti {
  preferitiService = inject(PreferitiService);

  onTogglePreferito(articolo: Articolo) {
    this.preferitiService.toggle(articolo);
  }
}

