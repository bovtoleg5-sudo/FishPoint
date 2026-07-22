import { useState } from 'react'
import './App.css'
import Map from './Map'


type Catch = {
  fishName: string
  weight: string
  place: string
  date: string
  photo: string
  location: string
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
      location

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

    <div className="app">

      <h1>🎣 Fishpoint</h1>

      <p>
        Твоя карта рыбалок и уловов
      </p>


      <Map
  catches={catches}
  setLocation={setLocation}
  setPlace={setPlace}
/>



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
    placeholder="Вес (кг)"
    value={weight}
    onChange={
      e => setWeight(e.target.value)
    }
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

  )
}

export default App