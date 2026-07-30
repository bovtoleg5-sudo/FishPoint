import {
  MapContainer,
  TileLayer
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
};

export default function Map({
  catches,
  setLocation,
  setPlace,
  showSearch,
  setShowSearch,
}: Props) {

  const navigate = useNavigate();

  const [currentPosition, setCurrentPosition] =
    useState<[number, number] | null>(null);

    const [selectedPosition, setSelectedPosition] =
    useState<[number, number] | null>(null);

    const [satellite, setSatellite] = useState(false);

    const [search, setSearch] = useState("");

    const [searchResults, setSearchResults] = useState<any[]>([]);

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

      setSearchResults(data);
      setShowSearch(true);

    } catch {
      alert("Ошибка поиска");
    }
  }


  return (
  <div className="map-wrapper">

    <button
  className="map-btn"
  onClick={() => setShowSearch(!showSearch)}
>
  🔍
</button>


    {showSearch && (
      <input
        className="search-input"
        type="text"
        placeholder="🔍 Найти озеро, реку или город..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchPlace();
          }
        }}
      />
    )}

    {searchResults.length > 0 && (
  <div className="search-results">

    {searchResults.slice(0,5).map((item:any, index:number)=>(

      <div
        key={index}
        className="search-item"
        onClick={() => {

          const lat = Number(item.lat);
          const lng = Number(item.lon);

          setCurrentPosition([lat,lng]);

          setLocation(`${lat}, ${lng}`);

          setPlace(item.display_name);

          setSearchResults([]);

        }}
      >
        📍 {item.display_name}
      </div>

    ))}

  </div>
)}


    <button
      className="gps-btn"
      onClick={getMyLocation}
    >
      📍
    </button>


    <button
      className="satellite-btn"
      onClick={() => setSatellite(!satellite)}
    >
      {satellite ? "🗺️" : "🛰️"}
    </button>


    <MapContainer
      center={[49.9935, 36.2304]}
      zoom={12}
      className="fullscreen-map"
    >

  {currentPosition && (
    <RecenterMap position={currentPosition} />


  )}

  <LocationMarker
  position={currentPosition}
  setPosition={setCurrentPosition}
  setLocation={setLocation}
  setPlace={setPlace}
  setSelectedPosition={setSelectedPosition}
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

{selectedPosition && (
  <div
    style={{
      position: "absolute",
      bottom: "170px",
      left: "15px",
      zIndex: 3000,
      background: "rgba(255,255,255,0.9)",
      backdropFilter: "blur(10px)",
      borderRadius: "50px",
      padding: "8px",
      boxShadow: "0 4px 15px rgba(0,0,0,.25)",
      width: "auto",
      textAlign: "center",
    }}
  >

    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <button
        onClick={() =>
          navigate("/add", {
            state: {
              location: `${selectedPosition[0]}, ${selectedPosition[1]}`,
            },
          })
        }
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "50px",
          border: "2px solid #fff",
          background: "#2e7d32",
          color: "#fff",
          fontSize: "20px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,.25)",
          transition: "0.2s",
        }}
      >
        🎣
      </button>

      <button
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "50px",
          border: "2px solid #fff",
          background: "#1976d2",
          color: "#fff",
          fontSize: "20px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,.25)",
          transition: "0.2s",
        }}
      >
        ✏️
      </button>

      <button
        onClick={() => setSelectedPosition(null)}
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "50px",
          border: "2px solid #fff",
          background: "#d32f2f",
          color: "#fff",
          fontSize: "20px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,.25)",
          transition: "0.2s",
        }}
      >
        🗑️
      </button>
    </div>
  </div>
)}

</div>
);
}