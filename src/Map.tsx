import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


type Catch = {
  fishName: string
  weight: string
  place: string
  date: string
  photo: string
  location: string
}


type Props = {
  catches: Catch[]
}


function Map({ catches }: Props) {

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


      {catches.map((item, index) => {

        if (!item.location) {
          return null
        }


        const position = item.location
          .split(',')
          .map(Number) as [number, number]


        return (
          <Marker
            key={index}
            position={position}
          >

            <Popup>

              🐟 {item.fishName}
              <br />
              ⚖️ {item.weight} кг
              <br />
              📍 {item.place}
              <br />
              📅 {item.date}

            </Popup>

          </Marker>
        )

      })}


    </MapContainer>
  )
}


export default Map