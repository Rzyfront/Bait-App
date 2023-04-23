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


import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css' 
import { useEffect, useState } from 'react';
const position = [51.505, -0.09];



let MAPCENTERDEFAULT = [40.574215, -105.08333];
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";



function Mapdata({Mapcenter,statemap,handleBoton,handlemapdatas}){
  //data point
    let [point,setPoint]=useState([])


    // data information
    const reverseGeoCoding = async(lng,lat)=> {
      const data = await ( await fetch(GEOCODE_URL+`${lng},${lat}`)).json();
      return data
    }

    //actions map
    function MyComponent() {
        const map =useMapEvents({
          click: async(e) => {        
            let {lat,lng}=e.latlng
           setPoint([lat,lng])
           const information=await reverseGeoCoding(lng ,lat)
           handlemapdatas(information)
          },
          // dblclick: (e) => {
          //   map.setView(Mapcenter, 10);
          // },  
        })
        useEffect(()=>{
          if(statemap===true)
          {
            map.setView(Mapcenter, 12);
            handleBoton()
          }
      
        },[Mapcenter])
        return null
      }




  return <MapContainer center={Mapcenter} zoom={15} scrollWheelZoom={false} className='tamaño'>
  <TileLayer
    url={MAP_LAYER_URL}
    attribution={MAP_LAYER_ATTRIBUTION}
  />

  {point.length && (
    <Marker position={point}>
      <Popup>
        Tu restaurante está aquí. <br /> Fácilmente personalizable.
      </Popup>
    </Marker>
  )}
    
  <MyComponent />

</MapContainer>

}
export default Mapdata;
