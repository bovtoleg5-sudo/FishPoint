import { useState } from 'react'
import './App.css'
import Map from './Map'
import BottomNavigation from "./components/BottomNavigation";
import ProfilePage from "./pages/ProfilePage";
import AddCatchPage from "./pages/AddCatchPage";
import FeedPage from "./pages/FeedPage";
import SplashScreen from "./components/SplashScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

type Catch = {
  fishName: string
  weight: string
  place: string
  date: string
  photo: string
  location: string
  isPublic: boolean
}


function App() {

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