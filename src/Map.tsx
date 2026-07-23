import {
  MapContainer,
  TileLayer
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useState } from "react";
import L from "leaflet";

import LocationMarker from "./components/LocationMarker";
import CatchMarkers from "./components/CatchMarkers";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

type Catch = {
  fishName: string;
  weight: string;
  place: string;
  date: string;
  photo: string;
  location: string;
};

type Props = {
  catches: Catch[];
  setLocation: (location: string) => void;
  setPlace: (place: string) => void;
};

export default function Map({
  catches,
  setLocation,
  setPlace,
}: Props) {
  const [currentPosition, setCurrentPosition] =
    useState<[number, number] | null>(null);

    async function getMyLocation() {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setCurrentPosition([lat, lng]);

      setLocation(`${lat}, ${lng}`);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await response.json();

        setPlace(data.display_name);
      } catch {
        setPlace(`GPS ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      }
    },
    () => {
      alert("Разрешите доступ к GPS");
    }
  );
}

  return (
  <div style={{ position: "relative" }}>
    <button
      onClick={getMyLocation}
      
      style={{
        position: "absolute",
        top: "15px",
        right: "15px",
        zIndex: 1000,
        background: "#ffffff",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px 15px",
        width: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      }}
    >
 GPS
</button>
      <MapContainer
  center={[49.9935, 36.2304]}
  zoom={12}
  style={{
    height: "400px",
    width: "100%",
  }}
>
              <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 
<LocationMarker
  position={currentPosition}
  setPosition={setCurrentPosition}
  setLocation={setLocation}
  setPlace={setPlace}
/>
*/}

        

        <CatchMarkers catches={catches} />
      </MapContainer>
    </div>
  );
}