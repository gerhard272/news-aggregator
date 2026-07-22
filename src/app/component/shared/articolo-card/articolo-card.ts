import { Component, Input, Output, EventEmitter, input, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Articolo } from '../../../models/articolo';
import { CategoriaBadge } from '../categoria-badge/categoria-badge';
import { Categorie } from '../../../services/categorie';
import { Preferiti } from '../../../services/preferiti';
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

  private readonly categorieService = inject(Categorie);
  private readonly preferitiService = inject(Preferiti);

  categoria = toSignal(
    toObservable(this.articolo).pipe(
      switchMap((articolo) => this.categorieService.getCategoriaBySlug(articolo.categoria)),
    ),
  );

  // Input to allow parent component to set favourite status
  preferito = input.required<boolean>();

  // Output to notify parent when favourite toggle is clicked
  @Output() togglePreferito = new EventEmitter<Articolo>();

  onTogglePreferito() {
    // Emit the current article to parent for toggling
    this.togglePreferito.emit(this.articolo());
  }
}
