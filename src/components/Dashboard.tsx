import React from 'react';
import { useAppContext } from '../context/AppContext';
import AnnouncementItem from './AnnouncementItem';
import EventItem from './EventItem';

const Dashboard: React.FC = () => {
  const { state } = useAppContext();
  const { items } = state;
  
  const announcements = items.filter(item => item.tipo === 'Anuncio');
  const events = items.filter(item => item.tipo === 'Evento');
  
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
      </div>
    </div>
  );
};

export default Dashboard;