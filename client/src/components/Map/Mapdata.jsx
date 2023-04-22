import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import myIcon from './Icono';
import L from 'leaflet';
// const MAPCENTERDEFAULT = [40.574215, -105.08333];
const MAP_LAYER_ATTRIBUTION = '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors';
const MAP_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const GEOCODE_URL = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=';

function Mapdata ({ Mapcenter, statemap, handleBoton, handlemapdatas }) {
  // data information
  const reverseGeoCoding = async (lng, lat) => {
    const data = await (await fetch(GEOCODE_URL + `${lng},${lat}`)).json();
    return data;
  };

  // actions map
  function MyComponent () {
    const map = useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        const information = await reverseGeoCoding(lng, lat);

        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });

        // Crea un nuevo marcador con las coordenadas obtenidas del evento click
        const marker = L.marker([lat, lng]).addTo(map).bindPopup(`Dirección: ${information.address.LongLabel}`);
        marker.openPopup();
      }
      // dblclick: (e) => {
      //   map.setView(Mapcenter, 10);
      // },
    });
    useEffect(() => {
      if (statemap === true) {
        map.setView(Mapcenter, 14);
        handleBoton();
      }
    }, [Mapcenter]);
    return null;
  }

  return (<MapContainer center={Mapcenter} zoom={14} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }} >
  <TileLayer
    url={MAP_LAYER_URL}
    attribution={MAP_LAYER_ATTRIBUTION}
  />

  <MyComponent />

</MapContainer>);
}
export default Mapdata;
