import { Component, input, output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Articolo } from '../../../models/articolo';
import { CategoriaBadge } from '../categoria-badge/categoria-badge';
import { Categorie } from '../../../services/categorie';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-articolo-card',
  imports: [RouterLink, DatePipe, SlicePipe, TitleCasePipe, UpperCasePipe, CategoriaBadge],
  templateUrl: './articolo-card.html',
  styleUrl: './articolo-card.css',
})
export class ArticoloCard {

  articolo = input.required<Articolo>();
  preferito = input(false);
  togglePreferito = output<Articolo>();

  private categorieService = inject(Categorie);

  categoria = toSignal(
    toObservable(this.articolo).pipe(
      switchMap(articolo => this.categorieService.getCategoriaBySlug(articolo.categoria))
    )
  );

  onTogglePreferito(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.togglePreferito.emit(this.articolo());
  }
}
