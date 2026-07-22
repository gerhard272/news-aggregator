# News Aggregator

**Gruppo 4 — Lettera N**

Componenti: Cristian Losito · Alessandro Foggetti · Gerhard Pirretti · Antonella Pesare

## Descrizione

App Angular che aggrega e organizza notizie per categoria. L'utente può salvare gli articoli preferiti e commentarli.

## Rotte

| Rotta          | Componente            | Descrizione                                            |
| -------------- | --------------------- | ------------------------------------------------------ |
| `/`            | HomeComponent         | Feed principale con ultime notizie in evidenza         |
| `/notizie`     | NotizieComponent      | Lista articoli con filtro per categoria e data         |
| `/notizie/:id` | ArticoloComponent     | Dettaglio articolo — rotta dinamica con ActivatedRoute |
| `/preferiti`   | PreferitiComponent    | Articoli salvati dall'utente                           |
| `/categorie`   | CategorieComponent    | Esplora per categoria con griglia e `@for`             |
| `/autori`      | AutoriComponent       | Layout padre con router-outlet figlio                  |
| `/autori/:id`  | AutoreDetailComponent | Profilo autore con suoi articoli                       |
| `/scrivi`      | ScriviComponent       | Reactive Form per inviare una segnalazione             |
| `**`           | NotFoundComponent     | 404                                                    |

## Dati (JSON)

I file JSON si trovano in `src/assets/data/`:

- **articoli.json** — Array di `Articolo[]`
  ```json
  {
    "id": 1,
    "titolo": "Titolo news",
    "categoria": "tech",
    "data": "2026-07-22",
    "autoreId": 1,
    "contenuto": "..."
  }
  ```
- **categorie.json** — Array di `Categoria[]`
  ```json
  { "slug": "tech", "nome": "Tecnologia", "emoji": "💻" }
  ```
- **autori.json** — Array di `Autore[]`
  ```json
  { "id": 1, "nome": "Mario Rossi", "bio": "...", "articoli": 3 }
  ```

## Interfacce TypeScript

`Articolo` · `Categoria` · `Autore`

> 💡 Ogni interfaccia ha almeno un campo opzionale (`?`). Es: `descrizione?: string`

## Servizi

- **NotizieService** — legge `articoli.json`, gestisce i filtri
- **PreferitiService** — salva i preferiti con Signal
- **AutoriService** — legge `autori.json`

## Reactive Form

Form di segnalazione (`/scrivi`): nome, email, categoria (select), titolo notizia, descrizione segnalazione, urgenza (radio)

## Pipe Angular utilizzate

`date` per le date articoli · `titlecase` per i titoli · `slice` per la preview del contenuto · `uppercase` per le categorie

## Struttura del progetto

```
src/
└── app/
    ├── component/
    │   ├── home/
    │   ├── notizie/
    │   ├── articolo/
    │   ├── preferiti/
    │   ├── categorie/
    │   ├── autori/
    │   │   └── autore-detail/
    │   ├── scrivi/
    │   ├── not-found/
    │   ├── navbar/
    │   └── shared/
    │       ├── articolo-card/
    │       ├── categoria-badge/
    │       └── footer/
    ├── services/
    │   ├── notizie.service.ts
    │   ├── preferiti.service.ts
    │   └── autori.service.ts
    ├── models/
    │   ├── articolo.ts
    │   ├── categoria.ts
    │   └── autore.ts
    ├── app.routes.ts
    └── app.component.ts
└── assets/
    └── data/
        ├── articoli.json
        ├── categorie.json
        └── autori.json
```

## Come avviare il progetto

```bash
npm install
ng serve
```

L'app sarà disponibile su `http://localhost:4200`
