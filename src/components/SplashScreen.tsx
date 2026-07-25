import { useEffect, useState } from "react";

export default function SplashScreen() {

  const [show, setShow] = useState(true);
const [hide, setHide] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {

  setHide(true);

  setTimeout(() => {
    setShow(false);
  }, 700);

}, 3500);

    return () => clearTimeout(timer);

  }, []);


  if (!show) {
    return null;
  }


  return (
    <div className={hide ? "splash hide" : "splash"}>

      <div className="water"></div>

      <div className="splash-content">

        <div className="fish-logo">
          🎣
        </div>

        <h1>
          FishPoint
        </h1>

        <p>
          Твой рыболовный дневник
        </p>

        <div className="loading">
          Загрузка...
        </div>

      </div>

    </div>
  );
}