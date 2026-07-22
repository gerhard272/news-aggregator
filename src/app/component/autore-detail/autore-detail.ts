import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Autori as AutoriService } from '../../services/autori';
import { Notizie as NotizieService } from '../../services/notizie';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ArticoloCard } from '../shared/articolo-card/articolo-card';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-autore-detail',
  imports: [ArticoloCard, RouterLink, SlicePipe],
  templateUrl: './autore-detail.html',
  styleUrl: './autore-detail.css',
})
export class AutoreDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly autoriService = inject(AutoriService);
  private readonly notizieService = inject(NotizieService);

  // Recupero l'autore
  autore = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.autoriService.getAutoreById(id);
      }),
    ),
  );

  // Recupero gli articoli dell'autore
  articoli = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.notizieService.getArticoliPerAutore(id);
      }),
    ),
    { initialValue: [] },
  );
}
