import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Categorie as CategorieService } from '../../services/categorie';
import { Categoria } from '../../models/categoria';
import { CategoriaBadge } from '../shared/categoria-badge/categoria-badge';

@Component({
  selector: 'app-categorie',
  imports: [RouterLink, CategoriaBadge],
  templateUrl: './categorie.html',
  styleUrl: './categorie.css',
})
export class Categorie implements OnInit {
  private categorieService = inject(CategorieService);

  categorie = signal<Categoria[]>([]);

  ngOnInit() {
    this.categorieService.getCategorie().subscribe(dati => {
      this.categorie.set(dati);
    });
  }
}