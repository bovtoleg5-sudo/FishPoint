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

      alert(
        "Фото сохранено: " + compressedImage.length
      );
    };

    img.src = reader.result as string;
  };

  reader.readAsDataURL(file);
}

  


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
        🎣 Уровень: Новичок
      </p>

      <p>
  🐟 Уловов: {catches.length}
      </p>

      <p>
        🏆 Рекорд: пока нет
      </p>


    </div>
  );
}