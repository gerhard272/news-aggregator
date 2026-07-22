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

# News Aggregator — Documentazione Service (stile Swagger)

> Nota: i service Angular non sono veri endpoint REST (i dati arrivano da file JSON statici in `assets/data/`), ma la documentazione è strutturata come una spec OpenAPI/Swagger per chiarezza e uniformità con gli altri progetti.

---

## 📰 `Notizie`

`services/notizie.ts` — Injectable, `providedIn: 'root'`

Recupera e filtra gli articoli da `assets/data/articoli.json`.

| Metodo                                                                       | Parametri           | Ritorna                             | Descrizione                                                   |
| ---------------------------------------------------------------------------- | ------------------- | ----------------------------------- | ------------------------------------------------------------- |
| `GET /articoli` → `getArticoli()`                                            | —                   | `Observable<Articolo[]>`            | Restituisce tutti gli articoli                                |
| `GET /articoli/{id}` → `getArticoloById(id)`                                 | `id: number`        | `Observable<Articolo \| undefined>` | Restituisce il singolo articolo, o `undefined` se non trovato |
| `GET /articoli?categoria={categoria}` → `getArticoliPerCategoria(categoria)` | `categoria: string` | `Observable<Articolo[]>`            | Filtra gli articoli per slug categoria                        |
| `GET /articoli?autoreId={autoreId}` → `getArticoliPerAutore(autoreId)`       | `autoreId: number`  | `Observable<Articolo[]>`            | Filtra gli articoli scritti da un autore                      |
| `GET /articoli?sort=data` → `getArticoliOrdinatiPerData()`                   | —                   | `Observable<Articolo[]>`            | Restituisce gli articoli ordinati dal più recente             |

**Schema `Articolo`**

```typescript
{
  id: number;
  titolo: string;
  categoria: string;
  data: string;       // formato ISO YYYY-MM-DD
  autoreId: number;
  contenuto: string;
  immagine?: string;  // opzionale
}
```

**Usato in:** `Home`, `Notizie` (lista), `Articolo` (dettaglio), `AutoreDetail`, `Categorie`

---

## ✍️ `Autori`

`services/autori.ts` — Injectable, `providedIn: 'root'`

Recupera gli autori da `assets/data/autori.json`.

| Metodo                                   | Parametri    | Ritorna                           | Descrizione                                                 |
| ---------------------------------------- | ------------ | --------------------------------- | ----------------------------------------------------------- |
| `GET /autori` → `getAutori()`            | —            | `Observable<Autore[]>`            | Restituisce tutti gli autori                                |
| `GET /autori/{id}` → `getAutoreById(id)` | `id: number` | `Observable<Autore \| undefined>` | Restituisce il singolo autore, o `undefined` se non trovato |

**Schema `Autore`**

```typescript
{
  id: number;
  nome: string;
  bio: string;
  articoli: number;
  fotoUrl?: string;  // opzionale
}
```

**Usato in:** `Autori` (lista, layout padre), `AutoreDetail` (rotta figlia `/autori/:id`)

---

## 🏷️ `Categorie`

`services/categorie.ts` — Injectable, `providedIn: 'root'`

Recupera le categorie da `assets/data/categorie.json`.

| Metodo                                               | Parametri      | Ritorna                              | Descrizione                                                    |
| ---------------------------------------------------- | -------------- | ------------------------------------ | -------------------------------------------------------------- |
| `GET /categorie` → `getCategorie()`                  | —              | `Observable<Categoria[]>`            | Restituisce tutte le categorie                                 |
| `GET /categorie/{slug}` → `getCategoriaBySlug(slug)` | `slug: string` | `Observable<Categoria \| undefined>` | Restituisce la singola categoria, o `undefined` se non trovata |

**Schema `Categoria`**

```typescript
{
  slug: string;
  nome: string;
  emoji: string;
  descrizione?: string;  // opzionale
}
```

**Usato in:** `Categorie` (pagina, griglia con `@for`), `Notizie` (filtro/select categorie), `Scrivi` (select categoria nel Reactive Form), `articolo-card` (nome/emoji della categoria)

---

## ❤️ `Preferiti`

`services/preferiti.ts` — Injectable, `providedIn: 'root'`

Gestisce lo stato locale (in memoria, via `Signal`) degli articoli preferiti. Non richiede chiamate HTTP.

| Metodo / Proprietà   | Parametri            | Ritorna                         | Descrizione                                             |
| -------------------- | -------------------- | ------------------------------- | ------------------------------------------------------- |
| `preferiti`          | —                    | `Signal<Articolo[]>` (readonly) | Lista corrente dei preferiti, reattiva                  |
| `totalePreferiti`    | —                    | `Signal<number>` (`computed`)   | Conteggio dei preferiti, reattivo                       |
| `aggiungi(articolo)` | `articolo: Articolo` | `void`                          | Aggiunge un articolo ai preferiti (se non già presente) |
| `rimuovi(id)`        | `id: number`         | `void`                          | Rimuove un articolo dai preferiti                       |
| `toggle(articolo)`   | `articolo: Articolo` | `void`                          | Aggiunge o rimuove a seconda dello stato attuale        |
| `isPreferito(id)`    | `id: number`         | `boolean`                       | Verifica se un articolo è già nei preferiti             |

**Usato in:** `articolo-card` (bottone toggle), `Preferiti` (pagina lista), `Navbar` (badge contatore)

---

## Riepilogo rapido

| Service     | Fonte dati                   | Tipo di ritorno | Richiede `HttpClient` |
| ----------- | ---------------------------- | --------------- | --------------------- |
| `Notizie`   | `assets/data/articoli.json`  | `Observable`    | ✅                    |
| `Autori`    | `assets/data/autori.json`    | `Observable`    | ✅                    |
| `Categorie` | `assets/data/categorie.json` | `Observable`    | ✅                    |
| `Preferiti` | stato in memoria             | `Signal`        | ❌                    |
