import { useState } from "react";
import { useLocation } from "react-router-dom";
import FishMap from "../components/FishMap";

const fishes = [
  "Щука",
  "Окунь",
  "Судак",
  "Карп",
  "Карась",
  "Лещ",
  "Сом",
  "Краснопёрка",
  "Плотва",
  "Линь",
  "Жерех",
  "Толстолобик",
  "Белый амур",
  "Форель",
  "Голавль"
];

type Props = {
  addCatch: (data: any) => void;
};

export default function AddCatchPage({ addCatch }: Props) {

const routerLocation = useLocation();

console.log("Переданные данные:", routerLocation.state);

const startLocation =
  routerLocation.state?.location || "";


  const [fishName, setFishName] = useState("");
  const [weight, setWeight] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(startLocation);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [isPublic, setIsPublic] = useState(false);


  function save() {

    addCatch({
      fishName,
      weight,
      place,
      date,
      photo,
      location,
      isPublic,
    });


    setFishName("");
    setWeight("");
    setPlace("");
    setDate("");
    setPhoto("");
    setLocation("");
    setPosition(null);
    setIsPublic(false);


    alert("🐟 Улов сохранён!");
  }



  function getMyLocation() {

    if (!navigator.geolocation) {

      alert("GPS не поддерживается");
      return;

    }


    navigator.geolocation.getCurrentPosition(

      (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;


        setLocation(`${lat}, ${lng}`);
setPosition([lat, lng]);

alert("📍 Место получено");

      },


      () => {

        alert("Не удалось получить геолокацию");

      }

    );

  }



  function uploadPhoto(e: any) {

    const file = e.target.files[0];


    if (file) {

      const reader = new FileReader();


      reader.onload = () => {

        setPhoto(
          reader.result as string
        );

      };


      reader.readAsDataURL(file);

    }

  }



  return (
    <div className="app">

      <h1>➕ Добавить улов</h1>

      <div className="card">

        <select
  value={fishName}
  onChange={(e) => setFishName(e.target.value)}
>

  <option value="">
    Выберите рыбу
  </option>

  {fishes.map((fish) => (
    <option
      key={fish}
      value={fish}
    >
      🐟 {fish}
    </option>
  ))}

</select>

        <input
          placeholder="Вес (кг)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <input
  placeholder="Место ловли"
  value={place}
  onChange={(e) => setPlace(e.target.value)}
/>


<button
  type="button"
  onClick={getMyLocation}
>
  📍 Моё место
</button>


{location && (
  <p>
    🗺️ Координаты: {location}
  </p>
)}

<FishMap
  position={position}
  setPosition={(coords) => {
    setPosition(coords);
    setLocation(`${coords[0]}, ${coords[1]}`);
  }}
/>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
  type="file"
  accept="image/*"
  capture="environment"
  onChange={uploadPhoto}
/>

{photo && (
  <div
    style={{
      marginTop: "15px",
      marginBottom: "15px",
      textAlign: "center",
    }}
  >
    <img
      src={photo}
      alt="Предпросмотр"
      style={{
        width: "100%",
        maxHeight: "260px",
        objectFit: "cover",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,.2)",
      }}
    />

    <button
      type="button"
      onClick={() => setPhoto("")}
      style={{
        marginTop: "12px",
        background: "#e53935",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        padding: "10px 18px",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      ❌ Удалить фото
    </button>
  </div>
)}

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
    marginBottom: "15px",
    width: "100%",
  }}
>
  <span
    style={{
      fontSize: "16px",
      fontWeight: "600",
    }}
  >
    {isPublic
      ? "🌍 Публичный улов"
      : "🔒 Личный улов"}
  </span>

  <label
    style={{
      position: "relative",
      display: "inline-block",
      width: "52px",
      height: "28px",
    }}
  >
    <input
      type="checkbox"
      checked={isPublic}
      onChange={(e) => setIsPublic(e.target.checked)}
      style={{
        opacity: 0,
        width: 0,
        height: 0,
      }}
    />

    <span
      style={{
        position: "absolute",
        cursor: "pointer",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isPublic ? "#4CAF50" : "#ccc",
        transition: ".3s",
        borderRadius: "30px",
      }}
    >
      <span
        style={{
          position: "absolute",
          content: '""',
          height: "22px",
          width: "22px",
          left: isPublic ? "27px" : "3px",
          top: "3px",
          background: "#fff",
          borderRadius: "50%",
          transition: ".3s",
        }}
      />
    </span>
  </label>
</div>

        <button onClick={save}>
          Сохранить улов 🐟
        </button>

      </div>

    </div>
  );
}