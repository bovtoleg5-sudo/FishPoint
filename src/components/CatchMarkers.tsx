import { Marker, Popup, useMap } from "react-leaflet";

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
};

export default function CatchMarkers({ catches }: Props) {

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

  </div>
</Popup>
          </Marker>
        );
      })}
    </>
  );
}