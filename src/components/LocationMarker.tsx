import { Marker, Popup, useMapEvents } from "react-leaflet";

type Props = {
  position: [number, number] | null;

  setPosition: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;

  setLocation: (location: string) => void;

  setPlace: (place: string) => void;

  setSelectedPosition: (
    position: [number, number]
  ) => void;
};

export default function LocationMarker({
  position,
  setPosition,
  setLocation,
  setPlace,
  setSelectedPosition,
}: Props) {
  useMapEvents({
    click(e) {
      console.log("Клик по карте");
      const coords: [number, number] = [
        e.latlng.lat,
        e.latlng.lng,
      ];

      setPosition(coords);

      setSelectedPosition(coords);

      setLocation(`${coords[0]}, ${coords[1]}`);

      setPlace(
        `Точка на карте ${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}`
      );
    },
  });

  if (!position) return null;

  return (
    <Marker position={position}>
      <Popup>
  📍 Новая точка
</Popup>
    </Marker>
  );
}