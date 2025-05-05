import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Item } from '../types/types';

const API_URL = 'http://localhost:5000/api/mensajes'; 

const useAutoFetchAnuncios = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) return;
        const mensajes: Item[] = await res.json();

        console.log("Mensajes recibidos del backend:", mensajes);
        dispatch({
          type: 'SET_ITEMS', 
          payload: mensajes,
        });
      } catch (err) {
        console.error('Error al obtener los mensajes:', err);
      }
    };

    fetchMensajes();
    const interval = setInterval(fetchMensajes, 30000); 

    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
};

export default useAutoFetchAnuncios;