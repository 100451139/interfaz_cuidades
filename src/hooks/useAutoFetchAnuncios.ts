import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Item } from '../types/types';

const API_URL = 'http://localhost:5000/ultimo-anuncio';

const useAutoFetchAnuncios = () => {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const fetchAnuncio = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) return;
        const raw = await res.json();

        console.log("📦 Respuesta cruda del backend:", raw);
        const tipo = raw.tipo ?? (
            raw.clasificacion?.toLowerCase() === 'anuncio' ? 'Anuncio' : 'Evento'
          );
        const data: Item = {
            ...raw,
            tipo: tipo,
            id: raw.id ?? crypto.randomUUID()
          };

          dispatch({
            type: 'ADD_ITEM',
            payload: {
              ...data,
            }
          });
      } catch (err) {
        console.error('❌ Error al obtener nuevo anuncio:', err);
      }
    };

    fetchAnuncio();
    const interval = setInterval(fetchAnuncio, 30000);

    return () => clearInterval(interval);
  }, [dispatch, state.items]);
};

export default useAutoFetchAnuncios;
