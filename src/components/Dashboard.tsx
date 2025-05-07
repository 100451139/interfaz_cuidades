import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import AnnouncementItem from './AnnouncementItem';
import EventItem from './EventItem';
import GlobalMap from './GlobalMap';

const Dashboard: React.FC = () => {
  const { state } = useAppContext();
  const { items } = state;

  const announcements = items.filter(item => item.tipo === 'Anuncio');
  const events = items.filter(item => item.tipo === 'Evento');

  const [locations, setLocations] = useState<{ lat: number; lng: number; title: string }[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const fetchedLocations: { lat: number; lng: number; title: string }[] = [];

      for (const item of items) {
        if (item.localizacion) {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?` +
            `address=${encodeURIComponent(item.localizacion + ', 28210, Valdemorillo, Madrid, España')}` +
            `&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
          );
          const data = await response.json();

          if (data.results?.length) {
            const { lat, lng } = data.results[0].geometry.location;
            fetchedLocations.push({ lat, lng, title: item.titulo });
          }
        }
      }

      setLocations(fetchedLocations);
    };

    fetchLocations();
  }, [items]);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-grid">
          <div className="announcements-section">
            <h2 className="section-title">Anuncios</h2>
            <div className="announcements-list">
              {announcements.length === 0 ? (
                <div className="empty-state">
                  <p>No hay anuncios publicados.</p>
                </div>
              ) : (
                announcements.map(item => (
                  <AnnouncementItem key={item.id} item={item} />
                ))
              )}
            </div>
          </div>
          
          <div className="events-section">
            <h2 className="section-title">Eventos</h2>
            <div className="events-list">
              {events.length === 0 ? (
                <div className="empty-state">
                  <p>No hay eventos programados.</p>
                </div>
              ) : (
                events.map(item => (
                  <EventItem key={item.id} item={item} />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="global-map-section mt-8">
          <h2 className="section-title">Mapa Global</h2>
          <GlobalMap locations={locations} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;