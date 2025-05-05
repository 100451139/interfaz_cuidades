import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';
import { Item } from '../types/types';

interface AnnouncementItemProps {
  item: Item;
}

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({ item }) => {
  const [attendance, setAttendance] = useState<number>(0);

  useEffect(() => {
    const savedAttendance = localStorage.getItem(`announcement-${item.id}`);
    if (savedAttendance) {
      setAttendance(parseInt(savedAttendance, 10));
    }
  }, [item.id]);

  const handleAttendance = () => {
    const newAttendance = attendance + 1;
    setAttendance(newAttendance);
    localStorage.setItem(`announcement-${item.id}`, newAttendance.toString());
  };

  const rotation = Math.random() * 6 - 3;

  return (
    <div 
      className="announcement-card"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="announcement-pin">
        <div className="pin-head"></div>
        <div className="pin-stem"></div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{item.titulo}</h3>
        
        {item.horario && (
          <div className="info-row">
            <Calendar size={18} className="icon-blue" />
            <div className="info-text font-medium">Horario: {item.horario}</div>
          </div>
        )}

        {item.fecha && (
          <div className="info-row">
            <Calendar size={18} className="icon-red" />
            <div className="info-text font-medium">Fechas: {item.fecha}</div>
          </div>
        )}
        {item.localizacion && (
          <div className="info-row">
            <MapPin size={18} className="icon-red" />
            <div className="info-text">{item.localizacion}</div>
          </div>
        )}
        
        {item.descripcion && (
          <p className="info-text">{item.descripcion}</p>
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

        <div className="attendance-section mt-4 flex items-center space-x-4">
          <button
            className="attendance-button bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            onClick={handleAttendance}
          >
            Asistir
          </button>
          <span className="attendance-count text-gray-700 text-sm font-medium">
            {attendance} personas asistirán
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementItem;