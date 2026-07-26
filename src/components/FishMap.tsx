import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

type Props = {
  position: [number, number] | null;
  setPosition: (value: [number, number]) => void;
  height?: string;
};

function ClickMarker({
  setPosition,
}: {
  setPosition: (value: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
}

export default function FishMap({
  position,
  setPosition,
  height = "250px",
}: Props) {
  return (
    <MapContainer
      center={position ?? [49.9935, 36.2304]}
      zoom={13}
      style={{
        height,
        width: "100%",
        borderRadius: "16px",
        marginTop: "15px",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ClickMarker setPosition={setPosition} />

      {position && (
        <Marker position={position}>
          <Popup>📍 Выбранное место</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}