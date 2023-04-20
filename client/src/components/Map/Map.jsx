import './Map.css'


import { MapContainer, TileLayer, Marker, Popup, useMapEvents,} from 'react-leaflet';
import 'leaflet/dist/leaflet.css' 
const position = [51.505, -0.09];






function Mapdata(){
    // const map = useMapEvents('click', () => {
    //     console.log("hola")
    //   })

    function MyComponent() {
        const map = useMapEvents({
          click: (e) => {
           console.log(e.latlng )
          },
        
        })
        return null
      }





return <div className='mapas'>
    
 <MapContainer center={position} zoom={13} scrollWheelZoom={false} className='tamaño'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
        
      <MyComponent/>
    </MapContainer>
</div>
}
export default Mapdata