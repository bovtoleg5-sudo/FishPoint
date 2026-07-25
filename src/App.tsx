import { useState } from 'react'
import './App.css'
import Map from './Map'
import BottomNavigation from "./components/BottomNavigation";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import MapPage from "./pages/MapPage";
import AddCatchPage from "./pages/AddCatchPage";
import FeedPage from "./pages/FeedPage";
import SplashScreen from "./components/SplashScreen";

type Catch = {
  fishName: string
  weight: string
  place: string
  date: string
  photo: string
  location: string
  isPublic: boolean
}

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
]

function App() {

  const [fishName, setFishName] = useState('')
  const [weight, setWeight] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState('')
  const [photo, setPhoto] = useState('')
  const [location, setLocation] = useState('')
  const [isPublic, setIsPublic] = useState(false)


  const [catches, setCatches] = useState<Catch[]>(() => {

    const saved = localStorage.getItem('fishpoint-catches')

    return saved ? JSON.parse(saved) : []

  })


  function saveCatches(data: Catch[]) {

    setCatches(data)

    localStorage.setItem(
      'fishpoint-catches',
      JSON.stringify(data)
    )

  }



  function addCatch() {

    if (!fishName || !weight || !place || !date) {
      return
    }


    const newCatch: Catch = {
  fishName,
  weight,
  place,
  date,
  photo,
  location,
  isPublic
}


    saveCatches([
      ...catches,
      newCatch
    ])


    setFishName('')
    setWeight('')
    setPlace('')
    setDate('')
    setPhoto('')
    setLocation('')
    setIsPublic(false)

  }



  function deleteCatch(index:number) {

    const updated = catches.filter(
      (_, i) => i !== index
    )

    saveCatches(updated)

  }



  function uploadPhoto(e:any) {

    const file = e.target.files[0]

    if(file){

      const reader = new FileReader()

      reader.onload = () => {

        setPhoto(
          reader.result as string
        )

      }

      reader.readAsDataURL(file)

    }

  }



  return (

  <BrowserRouter>

  <SplashScreen />

    <div className="app-container">

      <Routes>

  <Route
    path="/profile"
    element={<ProfilePage catches={catches} />}
  />

  <Route
  path="/add"
  element={
    <AddCatchPage
      addCatch={(data) => {
        saveCatches([
          ...catches,
          data
        ]);
      }}
    />
  }
/>


  <Route
  path="/map"
  element={
    <MapPage
      catches={catches}
      setLocation={setLocation}
      setPlace={setPlace}
    />
  }
/>

<Route
  path="/feed"
  element={
    <FeedPage
      catches={catches}
    />
  }
/>

<Route
  path="/"
  element={

    <div className="app">

      <header className="hero">

  <div className="hero-content">

    <div className="hero-logo">
      🎣
    </div>

    <div>

      <h1>FishPoint</h1>

      <p>
        Твой рыболовный дневник
      </p>

    </div>

  </div>

</header>


      <Map
  catches={catches}
  setLocation={setLocation}
  setPlace={setPlace}
/>

<div className="card profile-card">

  <h2>👤 Профиль рыбака</h2>

  <p>
    🎣 Рыбак
  </p>

  <p>
    🐟 Уловов: {catches.length}
  </p>

  <Link to="/profile">
    <button>
      Открыть профиль →
    </button>
  </Link>

</div>

      <div className="stats">

        <div className="stat-card">
          🐟
          <h3>{catches.length}</h3>
          <p>Уловов</p>
        </div>


        <div className="stat-card">
          ⚖️
          <h3>
            {
              catches.reduce(
                (sum,item)=>sum + Number(item.weight),
                0
              )
            } кг
          </h3>
          <p>Общий вес</p>
        </div>


        <div className="stat-card">
          🏆
          <h3>
            {
              catches.length > 0
              ? Math.max(
                  ...catches.map(
                    item=>Number(item.weight)
                  )
                )
              : 0
            } кг
          </h3>
          <p>Трофей</p>
        </div>


        <div className="stat-card">
          📍
          <h3>
            {
              new Set(
                catches.map(
                  item=>item.place
                )
              ).size
            }
          </h3>
          <p>Мест</p>
        </div>


      </div>




      <div className="card">

  <h2>
    ➕ Добавить улов
  </h2>


  <select
    value={fishName}
    onChange={e => setFishName(e.target.value)}
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
  type="number"
  step="0.1"
  min="0"
  placeholder="Вес (кг)"
  value={weight}
  onChange={(e) => setWeight(e.target.value)}
/>



  <input
    placeholder="Место ловли"
    value={place}
    onChange={
      e => setPlace(e.target.value)
    }
  />



  <input
    type="date"
    value={date}
    onChange={
      e => setDate(e.target.value)
    }
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
    marginBottom: "18px",
    marginTop: "10px",
  }}
>
  <input
    type="checkbox"
    checked={isPublic}
    onChange={(e) => setIsPublic(e.target.checked)}
    style={{
      width: "20px",
      height: "20px",
      cursor: "pointer",
    }}
  />

  <span
    style={{
      fontSize: "16px",
      fontWeight: 600,
    }}
  >
    {isPublic
      ? "🌍 Публичный улов"
      : "🔒 Личный улов"}
  </span>
</div>



  <button onClick={addCatch}>
  Сохранить улов 🐟
</button>

</div>


<h2>
  🐟 Мои уловы
</h2>

      <div className="catches">

  {catches.map((item, index) => (

    <div
      className="catch-card"
      key={index}
    >

      {item.photo && (
        <img
          className="catch-photo"
          src={item.photo}
          alt={item.fishName}
        />
      )}

      <div className="catch-content">

        <h2>🐟 {item.fishName}</h2>

        <div
  style={{
    display: "inline-block",
    marginBottom: "15px",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 600,
    color: "white",
    background: item.isPublic
      ? "#2E7D32"
      : "#546E7A",
  }}
>
  {item.isPublic
    ? "🌍 Публичный"
    : "🔒 Личный"}
</div>

        <div className="catch-info">

  <div>
    <span>⚖️ Вес</span>
    <b>{item.weight} кг</b>
  </div>

  <div>
    <span>📍 Место</span>
    <b>{item.place}</b>
  </div>

  <div>
    <span>📅 Дата</span>
    <b>{item.date}</b>
  </div>

</div>

{item.location && (
  <div className="coordinates">
    🗺️ {item.location}
  </div>
)}

<button
  className="delete-btn"
  onClick={() => deleteCatch(index)}
>
  🗑️ Удалить улов
</button>

      </div>

    </div>

  ))}

</div>



    </div>

          }
        />

      </Routes>

      <BottomNavigation />

    </div>

  </BrowserRouter>

  )
}

export default App