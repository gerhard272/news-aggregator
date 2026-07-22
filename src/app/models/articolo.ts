export interface Articolo {
  id: number;
  titolo: string;
  categoria: string;
  data: string;
  autoreId: number;
  contenuto: string;
  immagine?: string;
  descrizione?: string;
}
