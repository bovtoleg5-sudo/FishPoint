function uploadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
  const files = e.target.files;

  if (!files || files.length === 0) {
    return;
  }

  const file = files[0];

  const reader = new FileReader();

  reader.onload = () => {
    const image = reader.result as string;

    // показать аватар
    setAvatar(image);

    // СРАЗУ сохранить в localStorage
    localStorage.setItem("fishpoint-avatar", image);

    alert("Фото сохранено ✅");
  };

  reader.onerror = () => {
    alert("Ошибка чтения");
  };

  reader.readAsDataURL(file);
}