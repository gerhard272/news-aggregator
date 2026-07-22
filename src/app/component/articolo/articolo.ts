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
  Router,
  RouterLink
} from '@angular/router';

import { take } from 'rxjs';

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
  private readonly router = inject(Router);

  private readonly notizieService =
    inject(NotizieService);

  private readonly preferitiService =
    inject(PreferitiService);

  readonly articolo =
    signal<ArticoloModel | undefined>(undefined);

  readonly caricamento = signal(false);
  readonly errore = signal('');

  ngOnInit(): void {
    this.caricaArticolo();
  }

  caricaArticolo(): void {
    this.caricamento.set(true);
    this.errore.set('');
    this.articolo.set(undefined);

    const idParam =
      this.route.snapshot.paramMap.get('id');

    const id = Number(idParam);

    if (
      idParam === null ||
      Number.isNaN(id) ||
      id <= 0
    ) {
      this.vaiANotFoundArticolo();
      return;
    }

    this.notizieService
      .getArticoloById(id)
      .pipe(take(1))
      .subscribe({
        next: (articoloTrovato) => {
          if (!articoloTrovato) {
            this.vaiANotFoundArticolo();
            return;
          }

          this.articolo.set(articoloTrovato);
          this.caricamento.set(false);
        },

        error: (errore) => {
          console.error(
            'Errore durante il caricamento dell’articolo:',
            errore
          );

          this.errore.set(
            'Non è stato possibile caricare l’articolo. Riprova più tardi.'
          );

          this.caricamento.set(false);
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

    this.preferitiService.toggle(
      articoloCorrente
    );
  }

  private vaiANotFoundArticolo(): void {
    /*
     * Ferma lo spinner prima della navigazione.
     */
    this.caricamento.set(false);

    this.router.navigate(
      ['/404'],
      {
        queryParams: {
          tipo: 'articolo'
        }
      }
    );
  }
}