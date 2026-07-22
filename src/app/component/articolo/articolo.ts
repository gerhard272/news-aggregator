import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  DatePipe,
  TitleCasePipe,
  UpperCasePipe
} from '@angular/common';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { finalize } from 'rxjs';

import { Articolo as ArticoloModel } from '../../models/articolo';
import { Notizie as NotizieService } from '../../services/notizie';
import { Preferiti as PreferitiService } from '../../services/preferiti';

@Component({
  selector: 'app-articolo',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    TitleCasePipe,
    UpperCasePipe
  ],
  templateUrl: './articolo.html',
  styleUrl: './articolo.css'
})
export class Articolo implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly notizieService = inject(NotizieService);
  private readonly preferitiService = inject(PreferitiService);

  readonly articolo = signal<ArticoloModel | undefined>(undefined);
  readonly caricamento = signal(false);
  readonly errore = signal('');
  readonly articoloNonTrovato = signal(false);

  ngOnInit(): void {
    this.caricaArticolo();
  }

  caricaArticolo(): void {
    this.caricamento.set(true);
    this.errore.set('');
    this.articoloNonTrovato.set(false);
    this.articolo.set(undefined);

    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (
      idParam === null ||
      Number.isNaN(id) ||
      id <= 0
    ) {
      this.articoloNonTrovato.set(true);
      this.caricamento.set(false);
      return;
    }

    this.notizieService
      .getArticoloById(id)
      .pipe(
        finalize(() => {
          this.caricamento.set(false);
        })
      )
      .subscribe({
        next: (articoloTrovato) => {
          if (!articoloTrovato) {
            this.articoloNonTrovato.set(true);
            return;
          }

          this.articolo.set(articoloTrovato);
        },

        error: (errore) => {
          console.error(
            'Errore durante il caricamento dell’articolo:',
            errore
          );

          this.errore.set(
            'Non è stato possibile caricare l’articolo. Riprova più tardi.'
          );
        }
      });
  }

  isPreferito(): boolean {
    const articoloCorrente = this.articolo();

    if (!articoloCorrente) {
      return false;
    }

    return this.preferitiService.isPreferito(
      articoloCorrente.id
    );
  }

  togglePreferito(): void {
    const articoloCorrente = this.articolo();

    if (!articoloCorrente) {
      return;
    }

    this.preferitiService.toggle(articoloCorrente);
  }
}