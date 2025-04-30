export type ItemType = 'Anuncio' | 'Evento';

export interface Item {
  id: string;
  titulo: string;
  tipo: 'Evento' | 'Anuncio';
  dates?: string[];
  localizacion?: string;
  descripcion?: string;
  horario?: string;
  fecha?: string;
  links?: string[];
  clasificacion?: string;
}

export interface AppState {
  items: Item[];
}

export type AppAction = 
  | { type: 'SET_ITEMS'; payload: Item[] }
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'REMOVE_ITEM'; payload: string };