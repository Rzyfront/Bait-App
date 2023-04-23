import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import myIcon from './Icono';
import L from 'leaflet';
import reverseGeoCoding from './SearchMap/reverseGeocoding';
// const MAPCENTERDEFAULT = [40.574215, -105.08333];
const MAP_LAYER_ATTRIBUTION = '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors';
const MAP_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
function Mapdata ({ Mapcenter, statemap, handleBoton, handlemapdatas }) {
  // actions map
  function MyComponent () {
    const map = useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        const information = await reverseGeoCoding(lng, lat);
        handlemapdatas(information);
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
