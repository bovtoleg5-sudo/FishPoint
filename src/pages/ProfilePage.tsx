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


    alert("Профиль сохранён ✅");
  }


  function uploadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
  const files = e.target.files;

  if (!files || files.length === 0) {
    return;
  }

  const file = files[0];

  const reader = new FileReader();

  reader.onload = () => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");

      const size = 300;

      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.drawImage(
        img,
        0,
        0,
        size,
        size
      );

      const compressedImage = canvas.toDataURL(
        "image/jpeg",
        0.7
      );

      setAvatar(compressedImage);

      localStorage.setItem(
        "fishpoint-avatar",
        compressedImage
      );

    
    };

    img.src = reader.result as string;
  };

  reader.readAsDataURL(file);
}

  const xp = catches.length * 100;

let level = "Новичок";

if (xp >= 500) level = "Любитель";
if (xp >= 1000) level = "Опытный";
if (xp >= 2500) level = "Эксперт";
if (xp >= 5000) level = "Мастер";


const totalWeight = catches.reduce((sum, catchItem) => {
  return sum + (parseFloat(catchItem.weight) || 0);
}, 0);


const biggestCatch =
  catches.length > 0
    ? catches.reduce((max, current) =>
        parseFloat(current.weight) > parseFloat(max.weight)
          ? current
          : max
      )
    : null;


  return (
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
  type="button"
  onClick={saveProfile}
>
  💾 Сохранить профиль
</button>


      <hr />


      <h2>
        📊 Статистика
      </h2>


      <p>
🎣 Уровень: <b>{level}</b>
</p>

<p>
⭐ Опыт: {xp} XP
</p>

<p>
🐟 Уловов: {catches.length}
</p>

<p>
⚖️ Общий вес: {totalWeight.toFixed(1)} кг
</p>

<p>
🏆 Рекорд:{" "}
{biggestCatch
  ? `${biggestCatch.fishName} (${biggestCatch.weight} кг)`
  : "пока нет"}
</p>


    </div>
  );
}