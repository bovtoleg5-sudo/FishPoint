import { useMap } from "react-leaflet";

type Props = {
  setLocation: (location: string) => void;
  setPlace: (place: string) => void;
  setPosition: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;
};

export default function LocateButton({
  setLocation,
  setPlace,
  setPosition,
}: Props) {
  const map = useMap();

  async function getLocation() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setPosition([lat, lng]);

        map.setView([lat, lng], 15);

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
      }
    );
  }

  return (
  <div
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      zIndex: 1000,
    }}
  >
    <button
      onClick={getLocation}
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px 14px",
        cursor: "pointer",
        fontSize: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      📍 Моё место
    </button>
  </div>
);

}