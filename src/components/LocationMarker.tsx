import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { Fish, Pencil, Trash2 } from "lucide-react";

type Props = {
  position: [number, number] | null;

  setPosition: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;

  setLocation?: (location: string) => void;

  setPlace?: (place: string) => void;

  setSelectedPosition: (
    position: [number, number] | null
  ) => void;


};

export default function LocationMarker({
  position,
  setPosition,
  setLocation,
  setPlace,
  setSelectedPosition,
}: Props) {

  const navigate = useNavigate();


  useMapEvents({
    click(e) {
      console.log("Клик по карте"); 
      const coords: [number, number] = [
        e.latlng.lat,
        e.latlng.lng,
      ];

      setPosition(coords);

    

      setSelectedPosition(coords);

      setLocation?.(`${coords[0]}, ${coords[1]}`);

setPlace?.(
  `Точка на карте ${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}`
);
    },
  });

  if (!position) return null;

 return (
  <Marker position={position}>
    <Popup closeButton={false}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <button
          onClick={() =>
            navigate("/add", {
              state: {
                location: `${position[0]}, ${position[1]}`,
              },
            })
          }
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            border: "none",
            background: "#009688",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
            
          }}
        >
          <Fish
  size={30}
  strokeWidth={2.5}
  style={{ transform: "translateX(-13px)" }}
/>
        </button>

        <button
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            border: "none",
            background: "#1976D2",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          <Pencil
  size={30}
  strokeWidth={2.5}
  style={{ transform: "translateX(-13px)" }}
/>
        </button>

        <button
          onClick={() => {
            setPosition(null);
            setSelectedPosition(null);
          }}
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            border: "none",
            background: "#546E7A",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          <Trash2
  size={30}
  strokeWidth={2.5}
  style={{ transform: "translateX(-13px)" }}
/>
        </button>
      </div>
    </Popup>
  </Marker>
);
}