import { useState } from 'react'
import './App.css'
import Map from './Map'
import BottomNavigation from "./components/BottomNavigation";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
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


const [showSearch, setShowSearch] = useState(false)


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
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Map
  catches={catches}
  setLocation={setLocation}
  setPlace={setPlace}
  showSearch={showSearch}
  setShowSearch={setShowSearch}
/>
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