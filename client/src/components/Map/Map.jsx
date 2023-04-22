import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const MAP_CENTER_DEFAULT = [40.574215, -105.08333];
const MAP_LAYER_ATTRIBUTION = '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors';
const MAP_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
function MapHome () {
  return <div className='mapas'>

    <MapContainer center={MAP_CENTER_DEFAULT} zoom={13} scrollWheelZoom={false} style={{ width: '100%', height: '500px' }}>
      <TileLayer
       url={MAP_LAYER_URL}
       attribution={MAP_LAYER_ATTRIBUTION}
      />

    </MapContainer>
</div>;
}
export default MapHome;
