import { useState } from "react";

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

export default function ProfilePage({ catches }: Props) {

  const [name, setName] = useState(
    localStorage.getItem("fishpoint-name") || "Олег"
  );

  const [avatar, setAvatar] = useState(
    localStorage.getItem("fishpoint-avatar") || ""
  );


  function saveProfile() {

    localStorage.setItem(
      "fishpoint-name",
      name
    );

    localStorage.setItem(
      "fishpoint-avatar",
      avatar
    );

    alert("Профиль сохранён ✅");
  }


  function uploadAvatar(e: any) {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onload = () => {

        setAvatar(
          reader.result as string
        );

      };

      reader.readAsDataURL(file);
    }
  }


  const totalWeight = catches.reduce(
    (sum, item) => sum + Number(item.weight),
    0
  );


  const bestCatch = catches.length > 0
    ? Math.max(
        ...catches.map(
          item => Number(item.weight)
        )
      )
    : 0;


  const places = new Set(
    catches.map(
      item => item.place
    )
  ).size;


  return (

    <div className="app">

      <div className="card">

        <h1>
          👤 Профиль рыбака
        </h1>


        {avatar && (
          <img
            src={avatar}
            alt="avatar"
            style={{
              width:100,
              height:100,
              borderRadius:"50%",
              objectFit:"cover"
            }}
          />
        )}


        <h2>
          {name}
        </h2>


        <input
          placeholder="Введите имя"
          value={name}
          onChange={
            e => setName(e.target.value)
          }
        />


        <input
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
        />


        <button
          onClick={saveProfile}
        >
          💾 Сохранить профиль
        </button>


        <hr />


        <h2>
          📊 Статистика
        </h2>


        <p>
          🎣 Уровень: Новичок
        </p>


        <p>
          🐟 Уловов: {catches.length}
        </p>


        <p>
          ⚖️ Общий вес: {totalWeight} кг
        </p>


        <p>
          🏆 Лучший улов: {bestCatch} кг
        </p>


        <p>
          📍 Мест посещено: {places}
        </p>


      </div>

    </div>

  );
}