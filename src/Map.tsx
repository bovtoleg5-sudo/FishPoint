import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'


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
  setLocation: (location: string) => void
}


function LocationMarker({ setLocation }: { setLocation: (location: string) => void }) {

  const [position, setPosition] = useState<[number, number] | null>(null)


  useMapEvents({

    click(e) {

      const coords: [number, number] = [
        e.latlng.lat,
        e.latlng.lng
      ]

      setPosition(coords)

      setLocation(
        `${coords[0]}, ${coords[1]}`
      )

    }

  })


  return position ? (
    <Marker position={position}>
      <Popup>
        🎣 Место улова выбрано
      </Popup>
    </Marker>
  ) : null

}



function Map({ catches, setLocation }: Props) {


  return (

    <MapContainer
      center={[49.9935, 36.2304]}
      zoom={12}
      style={{
        height:'400px',
        width:'100%'
      }}
    >

      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


      <LocationMarker
        setLocation={setLocation}
      />


      {catches.map((item,index)=>{

        if(!item.location) return null


        const position =
          item.location
          .split(',')
          .map(Number) as [number,number]


        return (

          <Marker
            key={index}
            position={position}
          >

            <Popup>

              🐟 {item.fishName}
              <br/>
              ⚖️ {item.weight} кг
              <br/>
              📍 {item.place}

            </Popup>


          </Marker>

        )

      })}


    </MapContainer>

  )
}


export default Map