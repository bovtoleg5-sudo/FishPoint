import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  position: [number, number] | null;
};

export default function RecenterMap({ position }: Props) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.invalidateSize();
      map.setView(position, 16, {
        animate: true,
      });
    }
  }, [position, map]);

  return null;
}