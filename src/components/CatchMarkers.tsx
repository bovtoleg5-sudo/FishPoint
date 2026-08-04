import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

type Catch = {
  fishName: string;
  weight: string;
  place: string;
  date: string;
  photo: string;
  location: string;
  isPublic: boolean;
};

type Props = {
  catches: Catch[];
  onEdit: (item: Catch) => void;
  onDelete: (index: number) => void;
};

const fishIcon = L.icon({
  iconUrl: "/icons/fish-marker.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

export default function CatchMarkers({
  catches,
  onEdit,
  onDelete,
}: Props) {

  console.log("CatchMarkers onDelete:", onDelete);

  const map = useMap();

  return (
    <>
      {catches.map((item, index) => {
        if (!item.location) return null;

        const position =
          item.location.split(",").map(Number) as [number, number];

        return (
  <Marker
  key={index}
  position={position}
  icon={fishIcon}
  eventHandlers={{
    click: () => {
      map.flyTo(position, 16, {
        animate: true,
      });
    },
  }}
>
            <Popup>
  <div style={{ textAlign: "center" }}>

    {item.photo && (
      <img
        src={item.photo}
        alt={item.fishName}
        style={{
          width: "180px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "8px",
        }}
      />
    )}

    <div>
      🐟 <b>{item.fishName}</b>
    </div>

    <div>
      ⚖️ {item.weight} кг
    </div>

    <div>
      📅 {item.date}
    </div>

    <div>
      📍 {item.place}
    </div>

    <div style={{ marginTop: "10px" }}>

  <button
  onClick={() => {
    console.log("Нажали изменить:", item);
    onEdit(item);
  }}
  style={{
    marginRight: "5px",
    padding: "6px 10px",
    borderRadius: "8px",
    border: "none",
    background: "#4caf50",
    color: "white",
  }}
>
  ✏️ Изменить
</button>


  <button
  onClick={() => onDelete(index)}
    style={{
      padding: "6px 10px",
      borderRadius: "8px",
      border: "none",
      background: "#f44336",
      color: "white",
    }}
  >
    🗑️ Удалить
  </button>

</div>

  </div>
</Popup>
          </Marker>
        );
      })}
    </>
  );
}