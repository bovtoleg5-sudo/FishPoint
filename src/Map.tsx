import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


function Map() {

  return (

    <MapContainer
      center={[49.9935, 36.2304]}
      zoom={12}
      style={{
        height: '400px',
        width: '100%'
      }}
    >

      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

    </MapContainer>

  )

}


export default Map