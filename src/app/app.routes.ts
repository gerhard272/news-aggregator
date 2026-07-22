import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./component/home/home').then((m) => m.Home),
  },
  {
    path: 'notizie',
    loadComponent: () => import('./component/notizie/notizie').then((m) => m.Notizie),
  },
  {
    path: 'notizie/:id',
    loadComponent: () => import('./component/articolo/articolo').then((m) => m.Articolo),
  },
  {
    path: 'preferiti',
    loadComponent: () => import('./component/preferiti/preferiti').then((m) => m.Preferiti),
  },
  {
    path: 'categorie',
    loadComponent: () => import('./component/categorie/categorie').then((m) => m.Categorie),
  },
  {
    path: 'autori',
    loadComponent: () => import('./component/autori/autori').then((m) => m.Autori),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./component/autore-detail/autore-detail').then((m) => m.AutoreDetail),
      },
    ],
  },
  {
    path: 'scrivi',
    loadComponent: () => import('./component/scrivi/scrivi').then((m) => m.Scrivi),
  },
  {
    path: '**',
    loadComponent: () => import('./component/not-found/not-found').then((m) => m.NotFound),
  },
];
