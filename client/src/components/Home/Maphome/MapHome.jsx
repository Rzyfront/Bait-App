// import './Map.css';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useState } from 'react';
// const MAP_LAYER_ATTRIBUTION = '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors';
// const MAP_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// const GEOCODE_URL = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=';
// function MapHome () {
//   // data point
//   const [point, setPoint] = useState([]);

//   // data information
//   const reverseGeoCoding = async (lng, lat) => {
//     const data = await (await fetch(GEOCODE_URL + `${lng},${lat}`)).json();
//     return data;
//   };

//   // actions map
//   function MyComponent () {
//     const map = useMapEvents({
//       click: async (e) => {
//         const { lat, lng } = e.latlng;
//         setPoint([lat, lng]);
//         const information = await reverseGeoCoding(lng, lat);
//       }
//       // dblclick: (e) => {
//       //   map.setView(Mapcenter, 10);
//       // },
//     });

//     return null;
//   }

//   return <MapContainer center={[102, 10]} zoom={15} scrollWheelZoom={false} className='tamaño'>
//         <TileLayer
//             url={MAP_LAYER_URL}
//             attribution={MAP_LAYER_ATTRIBUTION}
//         />

//         {point.length && (
//             <Marker position={point}>
//                 <Popup>
//                     Tu restaurante está aquí. <br /> Fácilmente personalizable.
//                 </Popup>
//             </Marker>
//         )}

//         <MyComponent />

//     </MapContainer>;
// }
// export default MapHome;
