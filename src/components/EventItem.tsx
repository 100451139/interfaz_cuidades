import React from 'react';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';
import { Item } from '../types/types';

interface EventItemProps {
  item: Item;
}

const EventItem: React.FC<EventItemProps> = ({ item }) => {
  
  return (
    <div className="event-card">
      <div className="card-content">
        <h3 className="card-title">{item.titulo}</h3>
        
        <div className="flex-wrap">
        {item.horario && (
          <div className="info-row">
            <Calendar size={20} className="icon-blue" />
            <div className="info-text font-medium">Horario: {item.horario}</div>
          </div>
        )}

        {item.fecha && (
          <div className="info-row">
            <Calendar size={20} className="icon-red" />
            <div className="info-text font-medium">Fechas: {item.fecha}</div>
          </div>
        )}
          
        {item.localizacion && (
            <div className="info-row">
              <MapPin size={20} className="icon-red" />
              <div className="info-text">{item.localizacion}</div>
            </div>
          )}
        </div>
        
        {item.descripcion && (
          <div className="description">
            <p className="info-text">{item.descripcion}</p>
          </div>
        )}
        
        {item.links && item.links.length > 0 && (
          <div className="links-section">
            <div className="info-row">
              <LinkIcon size={18} className="icon-blue" />
              <span className="links-title">Enlaces de interés:</span>
            </div>
            <ul className="links-list">
              {item.links.map((url, index) => (
          <li key={index}>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="link-item"
            >
              {url}
            </a>
          </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventItem;