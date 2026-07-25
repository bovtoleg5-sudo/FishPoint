import { useState } from "react";

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

  const [fishName, setFishName] = useState("");
  const [weight, setWeight] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState("");
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


        setLocation(
          `${lat}, ${lng}`
        );


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

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
  type="file"
  accept="image/*"
  onChange={uploadPhoto}
/>

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "15px",
    marginBottom: "15px",
  }}
>

  <input
    type="checkbox"
    checked={isPublic}
    onChange={(e) => setIsPublic(e.target.checked)}
  />

  <span>
    {isPublic
      ? "🌍 Публичный улов"
      : "🔒 Личный улов"}
  </span>

</div>

        <button onClick={save}>
          Сохранить улов 🐟
        </button>

      </div>

    </div>
  );
}