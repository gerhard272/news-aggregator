import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { finalize, forkJoin } from 'rxjs';

import { Articolo } from '../../models/articolo';
import { Categoria } from '../../models/categoria';

import { Notizie as NotizieService } from '../../services/notizie';
import { Categorie as CategorieService } from '../../services/categorie';

import { ArticoloCard } from '../shared/articolo-card/articolo-card';

@Component({
  selector: 'app-notizie',
  standalone: true,
  imports: [
    FormsModule,
    ArticoloCard
  ],
  templateUrl: './notizie.html',
  styleUrl: './notizie.css'
})
export class Notizie implements OnInit {
  private readonly notizieService = inject(NotizieService);
  private readonly categorieService = inject(CategorieService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  articoli: Articolo[] = [];
  categorie: Categoria[] = [];

  categoriaSelezionata = '';
  dataSelezionata = '';

  caricamento = false;
  errore = '';

  ngOnInit(): void {
    this.caricaDati();
  }

  get articoliFiltrati(): Articolo[] {
    return this.articoli.filter((articolo) => {
      const categoria = articolo.categoria ?? '';
      const data = articolo.data ?? '';

      const corrispondeCategoria =
        !this.categoriaSelezionata ||
        categoria === this.categoriaSelezionata;

      const corrispondeData =
        !this.dataSelezionata ||
        data === this.dataSelezionata;

      return corrispondeCategoria && corrispondeData;
    });
  }

  caricaDati(): void {
    this.caricamento = true;
    this.errore = '';

    this.changeDetector.markForCheck();

    forkJoin({
      articoli: this.notizieService.getArticoliOrdinatiPerData(),
      categorie: this.categorieService.getCategorie()
    })
      .pipe(
        finalize(() => {
          this.caricamento = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe({
        next: ({ articoli, categorie }) => {
          this.articoli = articoli;
          this.categorie = categorie;

          this.changeDetector.markForCheck();
        },

        error: (errore) => {
          console.error(
            'Errore durante il caricamento dei dati:',
            errore
          );

          this.errore =
            'Non è stato possibile caricare le notizie. Riprova più tardi.';

          this.changeDetector.markForCheck();
        }
      });
  }

  resetFiltri(): void {
    this.categoriaSelezionata = '';
    this.dataSelezionata = '';
  }
}