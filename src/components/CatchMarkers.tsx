import { Marker, Popup } from "react-leaflet";

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
  return (
    <>
      {catches.map((item, index) => {
        if (!item.location) return null;

        const position =
          item.location.split(",").map(Number) as [number, number];

        return (
          <Marker key={index} position={position}>
            <Popup>
              🐟 {item.fishName}
              <br />
              ⚖️ {item.weight} кг
              <br />
              📍 {item.place}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}