import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  useMapEvents,
  useMap
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import L from 'leaflet'

import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'


const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

L.Marker.prototype.options.icon = DefaultIcon



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
  setPlace: (place: string) => void
}



function LocationMarker({
  setLocation,
  setPlace,
  position,
  setPosition
}: {
  setLocation: (location: string) => void
  setPlace: (place: string) => void
  position: [number, number] | null
  setPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>
}) {



  useMapEvents({

    click(e) {

      const coords: [number, number] = [
        e.latlng.lat,
        e.latlng.lng
      ]


      setPosition(coords)


      const gps =
        `${coords[0]}, ${coords[1]}`


      setLocation(gps)


      setPlace(
        `Точка на карте ${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}`
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

function LocateButton({
  setLocation,
  setPlace,
  setPosition
}: {
  setLocation: (location:string)=>void
  setPlace: (place:string)=>void
  setPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>
}) {

  const map = useMap()


  async function getLocation() {

  navigator.geolocation.getCurrentPosition(

    async (position) => {

      const lat = position.coords.latitude
      const lng = position.coords.longitude
      
      setPosition([lat, lng])

      console.log("GPS:", lat, lng)

      map.setView([lat, lng], 15)

      setLocation(`${lat}, ${lng}`)

      try {

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        )

        const data = await response.json()

        setPlace(
          data.display_name || `GPS ${lat.toFixed(4)}, ${lng.toFixed(4)}`
        )

      } catch {

        setPlace(
          `GPS ${lat.toFixed(4)}, ${lng.toFixed(4)}`
        )

      }

    },

    () => {
      alert("Разрешите доступ к GPS")
    }

  )

}


  return (

    <button
      style={{
        position:'absolute',
        zIndex:1000,
        top:20,
        right:20,
        width:'auto',
        padding:'10px 15px'
      }}

      onClick={getLocation}
    >

      📍 Моё место

    </button>

  )

}



function Map({
  catches,
  setLocation,
  setPlace
}: Props) {

  const [currentPosition, setCurrentPosition] =
  useState<[number, number] | null>(null)

  return (

  <div style={{position:'relative'}}>

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
         setPlace={setPlace}
         position={currentPosition}
         setPosition={setCurrentPosition}
      />

      <LocateButton
        setLocation={setLocation}
        setPlace={setPlace}
        setPosition={setCurrentPosition}
      />


      {catches.map((item,index)=>{

        if(!item.location)
          return null


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

  </div>

  )

}

export default Map