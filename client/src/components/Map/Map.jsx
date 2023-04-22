import './Map.css';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
const position = [51.505, -0.09];

const MAP_CENTER_DEFAULT = [40.574215, -105.08333];
const MAP_LAYER_ATTRIBUTION = '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors';
const MAP_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const GEOCODE_URL = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=';

function Mapdata () {
  const [point, setPoint] = useState([]);
  const reverseGeoCoding = async () => {
    const data = await (await fetch(GEOCODE_URL + `${position[0]},${position[1]}`)).json();
    console.log(data.address);
    // const addressLabel = (data.address !== undefined) ? data.address.LongLabel : "Unknown";
    // this.setState({ address: addressLabel});
  };

  function MyComponent () {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPoint([lat, lng]);
        reverseGeoCoding();
      }

    });
    return null;
  }

  return <div className='mapas'>

 <MapContainer center={position} zoom={13} scrollWheelZoom={false} className='tamaño'>
      <TileLayer
       url={MAP_LAYER_URL}
       attribution={MAP_LAYER_ATTRIBUTION}
      />

      {point.length && <Marker position={point}>
        <Popup>
          tu Restaurante esta qui. <br /> Easily customizable.
        </Popup>
      </Marker>}

      <MyComponent/>
    </MapContainer>
</div>;
}
export default Mapdata;
