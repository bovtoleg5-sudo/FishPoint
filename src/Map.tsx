import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


function Map({ catches }: any) {

  const position: [number, number] = [
    49.9935,
    36.2304
  ]


  return (

    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >


      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


      {catches.map((item: any, index: number) => {

        if (!item.location) return null

        const coords = item.location.split(',')


        return (

          <Marker
            key={index}
            position={[
              Number(coords[0]),
              Number(coords[1])
            ]}
          >

            <Popup>

              🎣 {item.fishName}
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