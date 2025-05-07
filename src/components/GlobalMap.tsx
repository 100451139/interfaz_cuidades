import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

interface GlobalMapProps {
  locations: { lat: number; lng: number; title: string }[]; 
}

const GlobalMap: React.FC<GlobalMapProps> = ({ locations }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  if (loadError) return <p className="text-red-500">Error al cargar Google Maps</p>;
  if (!isLoaded) return <p className="text-gray-500">Cargando mapa…</p>;

  const center = locations.length > 0 ? locations[0] : { lat: 40.416775, lng: -3.703790 }; 

  const groupedLocations = locations.reduce((acc, location) => {
    const key = `${location.lat},${location.lng}`;
    if (!acc[key]) {
      acc[key] = { ...location, count: 1 };
    } else {
      acc[key].count += 1;
    }
    return acc;
  }, {} as Record<string, { lat: number; lng: number; title: string; count: number }>);

  const groupedMarkers = Object.values(groupedLocations);

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '500px' }}
      center={center}
      zoom={12}
    >
      {groupedMarkers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          label={
            marker.count > 1
              ? {
                  text: `${marker.count}`, 
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }
              : undefined 
          }
          title={marker.count > 1 ? `${marker.count} eventos` : marker.title || 'Evento'}
        />
      ))}
    </GoogleMap>
  );
};

export default GlobalMap;