import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './component/shared/footer/footer';
import { ArticoloCard } from './component/shared/articolo-card/articolo-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, ArticoloCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('news-aggregator');

  dummyArticoli = [
    {
      id: 1,
      titolo: 'Nuovo framework web: Angular evolve ancora',
      categoria: 'tech',
      data: '2026-07-22',
      autoreId: 1,
      contenuto: 'Il team di Angular ha annunciato nuove incredibili funzionalità che rivoluzioneranno lo sviluppo frontend. Le performance sono raddoppiate e la developer experience è sempre più fluida. Scopriamo insieme i dettagli di questo aggiornamento epocale.'
    },
    {
      id: 2,
      titolo: 'Scoperta una nuova galassia',
      categoria: 'scienza',
      data: '2026-07-20',
      autoreId: 2,
      contenuto: 'Il telescopio spaziale di ultima generazione ha catturato le immagini di una galassia mai vista prima, situata ai confini dell\'universo osservabile. Gli astrofisici sono al lavoro per analizzare i dati ricevuti.'
    },
    {
      id: 3,
      titolo: 'Olimpiadi 2026: risultati a sorpresa',
      categoria: 'sport',
      data: '2026-07-18',
      autoreId: 3,
      contenuto: 'Grandi emozioni nella giornata di ieri con vittorie inaspettate. Molti atleti emergenti hanno superato i campioni in carica, segnando un passaggio generazionale importante in diverse discipline sportive.'
    }
  ];
}
