import { Link, useLocation } from "react-router-dom";

export default function BottomNavigation() {
  const location = useLocation();

  const items = [
    { to: "/", icon: "🏠", label: "Главная" },
    { to: "/map", icon: "🗺️", label: "Карта" },
    { to: "/add", icon: "➕", label: "Добавить" },
    { to: "/feed", icon: "🌍", label: "Лента" },
    { to: "/profile", icon: "👤", label: "Профиль" },
  ];

  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={
            location.pathname === item.to
              ? "bottom-item active"
              : "bottom-item"
          }
        >
          <div>{item.icon}</div>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}