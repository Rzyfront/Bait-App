import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { AiFillCar } from 'react-icons/ai';
import './Map.css';
import myIcon from './Icono';
import { useEffect, useState } from 'react';

const MAP_LAYER_ATTRIBUTION = '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors';
const MAP_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

function MapHouse () {
  const { locals } = useSelector((state) => state.cards);

  const city = useSelector((state) => state.ubication);
  const foco = useSelector((state) => state.foco);

  const [mCity, setMcity] = useState(city);
  const [mfoco, setmfoco] = useState(foco);

  function MyComponent () {
    const map = useMapEvents({});

    useEffect(() => {
      if (mfoco !== foco) {
        setmfoco(foco);
        map.flyTo([foco.lat, foco.lng], 18);
      }
    }, [foco]);
    useEffect(() => {
      if (mCity !== city) {
        setMcity(city);
        map.setView([city.lat, city.lng], 12);
      }
    }, [city]);
    return null;
  }

  return (<MapContainer center={[mCity.lat, mCity.lng]} zoom={12} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }} >
        <TileLayer
            url={MAP_LAYER_URL}
            attribution={MAP_LAYER_ATTRIBUTION}
        />
    {locals &&
       locals.map((data, index) => {
         return <Marker position={[data.lat, data.lng]} key={index} icon={myIcon} >
               <Popup >
                   <div style={{ display: 'block', maxWidth: '80px', fontSize: '0.5rem', padding: '0', marginBottom: '0' }}>
                       <p style={{ height: 'min-content', padding: '0', marginBottom: '0' }}> Direccion {data.location} </p>
                       <div style={{ display: 'flex', margin: 'auto', width: 'min-content', height: 'min-content' }}>

                           <a target='_blank' href={`https://www.google.com/maps/place/${data.lat},${data.lng}`} style={{ fontSize: '1rem', marginBottom: '0' }} className='mause' rel="noreferrer" ><AiFillCar/></a>
                       </div>
                   </div>
               </Popup>
           </Marker>;
       })
       }
      <MyComponent />
    </MapContainer>);
}
export default MapHouse;
