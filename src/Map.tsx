import {
  MapContainer,
  TileLayer
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useState } from "react";
import L from "leaflet";

import LocationMarker from "./components/LocationMarker";
import CatchMarkers from "./components/CatchMarkers";
import RecenterMap from "./components/RecenterMap";

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

    const [satellite, setSatellite] = useState(false);

    const [search, setSearch] = useState("");

    async function getMyLocation() {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setCurrentPosition([lat, lng]);

      console.log("Моя точка:", lat, lng);

      setLocation(`${lat}, ${lng}`);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await response.json();

        setPlace(
          data.display_name || `GPS ${lat.toFixed(4)}, ${lng.toFixed(4)}`
        );

      } catch {
        setPlace(`GPS ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      }
    },
    () => {
      alert("Разрешите доступ к GPS");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
}

async function searchPlace() {
    if (!search.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
      );

      const data = await response.json();

      if (data.length === 0) {
        alert("Место не найдено");
        return;
      }

      const lat = Number(data[0].lat);
      const lng = Number(data[0].lon);

      setCurrentPosition([lat, lng]);

      setLocation(`${lat}, ${lng}`);
      setPlace(data[0].display_name);

    } catch {
      alert("Ошибка поиска");
    }
  }


  return (
  <div style={{ position: "relative" }}>
    <input
  type="text"
  placeholder="🔍 Найти озеро, реку или город..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
  if (e.key === "Enter") {
    searchPlace();
  }
}}

  style={{
    position: "absolute",
    top: "10px",
    left: "10px",
    zIndex: 2000,
    width: "calc(100% - 120px)",
    padding: "10px 15px",
    maxWidth: "300px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  }}
/>
    <button
      onClick={getMyLocation}
      style={{
        position: "absolute",
        top: "60px",
        right: "10px",
        zIndex: 2000,
        background: "#ffffff",
        color: "#000000",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px 15px",
        width: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      }}
    >
      📍 Моё место
    </button>

    <button
      onClick={() => setSatellite(!satellite)}
      style={{
        position: "absolute",
        top: "110px",
        right: "10px",
        zIndex: 2000,
        background: "#ffffff",
        color: "#000000",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px 15px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      }}
    >
      {satellite ? "🗺️ Карта" : "🛰️ Спутник"}
    </button>

     <MapContainer
  center={[49.9935, 36.2304]}
  zoom={12}
  style={{
    height: "400px",
    width: "100%",
  }}
>

  {currentPosition && (
    <RecenterMap position={currentPosition} />
  )}

  <LocationMarker
    position={currentPosition}
    setPosition={setCurrentPosition}
    setLocation={setLocation}
    setPlace={setPlace}
  />

  <CatchMarkers catches={catches} />

  <TileLayer
    attribution={
      satellite
        ? '&copy; Esri'
        : '&copy; OpenStreetMap contributors'
    }
    url={
      satellite
        ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        : "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    }
  />

</MapContainer>
</div>
);
}