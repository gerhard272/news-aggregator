import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Categorie as CategorieService } from '../../services/categorie';
import { Notizie as NotizieService } from '../../services/notizie';
import { Categoria } from '../../models/categoria';
import { Articolo } from '../../models/articolo';
import { CategoriaBadge } from '../shared/categoria-badge/categoria-badge';
import { ArticoloCard } from '../shared/articolo-card/articolo-card';

@Component({
  selector: 'app-categorie',
  imports: [CategoriaBadge, ArticoloCard],
  templateUrl: './categorie.html',
  styleUrl: './categorie.css',
})
export class Categorie implements OnInit {
  private readonly categorieService = inject(CategorieService);
  private readonly notizieService = inject(NotizieService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  categorie: Categoria[] = [];
  categoriaSelezionata: Categoria | null = null;
  articoliCategoria: Articolo[] = [];

  caricamento = false;
  caricamentoArticoli = false;
  errore = '';

  ngOnInit(): void {
    this.caricaCategorie();
  }

  caricaCategorie(): void {
    this.caricamento = true;
    this.errore = '';
    this.changeDetector.markForCheck();

    this.categorieService.getCategorie().subscribe({
      next: (dati) => {
        this.categorie = dati;
        this.caricamento = false;
        this.changeDetector.markForCheck();
      },
      error: (err) => {
        console.error('Errore durante il caricamento delle categorie:', err);
        this.errore = 'Non è stato possibile caricare le categorie. Riprova più tardi.';
        this.caricamento = false;
        this.changeDetector.markForCheck();
      },
    });
  }

  selezionaCategoria(cat: Categoria): void {
    this.categoriaSelezionata = cat;
    this.caricamentoArticoli = true;
    this.articoliCategoria = [];
    this.changeDetector.markForCheck();

    this.notizieService.getArticoliPerCategoria(cat.slug).subscribe({
      next: (articoli) => {
        this.articoliCategoria = articoli;
        this.caricamentoArticoli = false;
        this.changeDetector.markForCheck();
      },
      error: (err) => {
        console.error('Errore durante il caricamento degli articoli:', err);
        this.caricamentoArticoli = false;
        this.changeDetector.markForCheck();
      },
    });
  }

  tornaAllaGriglia(): void {
    this.categoriaSelezionata = null;
    this.articoliCategoria = [];
    this.changeDetector.markForCheck();
  }
}