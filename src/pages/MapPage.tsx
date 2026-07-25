import Map from "../Map";

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
  setLocation: (value: string) => void;
  setPlace: (value: string) => void;
};

export default function MapPage({
  catches,
  setLocation,
  setPlace,
}: Props) {
  return (
    <div className="map-page">

      <h1>🗺️ Карта рыбалок</h1>

      <Map
        catches={catches}
        setLocation={setLocation}
        setPlace={setPlace}
      />

    </div>
  );
}