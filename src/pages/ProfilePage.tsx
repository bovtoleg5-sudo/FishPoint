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


  function uploadAvatar(e: React.ChangeEvent<HTMLInputElement>) {

  alert("uploadAvatar вызвана");

  const files = e.target.files;

  if (!files || files.length === 0) {
    alert("Файл не выбран");
    return;
  }

  const file = files[0];

  alert(file.name);

  const reader = new FileReader();

  reader.onload = () => {
    alert("Фото прочитано");
    setAvatar(reader.result as string);
  };

  reader.onerror = () => {
    alert("Ошибка чтения");
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
  onChange={(e) => {
    alert("onChange");
    uploadAvatar(e);
  }}
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