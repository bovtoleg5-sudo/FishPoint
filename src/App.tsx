import { useState } from 'react'
import './App.css'
import Map from './Map'
import BottomNavigation from "./components/BottomNavigation";
import ProfilePage from "./pages/ProfilePage";
import AddCatchPage from "./pages/AddCatchPage";
import FeedPage from "./pages/FeedPage";
import SplashScreen from "./components/SplashScreen";
import { Routes, Route, useNavigate } from "react-router-dom";
import type { Catch } from "./types";



export default function App() {
  return <AppContent />;
}

function AppContent() {
  

  const navigate = useNavigate();

const [showSearch, setShowSearch] = useState(false)


const [editCatch, setEditCatch] = useState<Catch | null>(null);


const [catches, setCatches] = useState<Catch[]>(() => {

  const saved = localStorage.getItem('fishpoint-catches')

  return saved ? JSON.parse(saved) : []

})


const handleDelete = (index: number) => {

  const updated = catches.filter(
    (_, i) => i !== index
  );

  setCatches(updated);

  localStorage.setItem(
    "fishpoint-catches",
    JSON.stringify(updated)
  );

};

const handleEdit = (item: Catch) => {

  setEditCatch(item);

  navigate("/add", {
    state: {
      editCatch: item
    }
  });

};
  function saveCatches(data: Catch[]) {

    setCatches(data)

    localStorage.setItem(
      'fishpoint-catches',
      JSON.stringify(data)
    )

  }

console.log("App handleDelete:", handleDelete);

return (

  <>

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
     editCatch={editCatch}
     addCatch={(data) => {

       if (editCatch) {

         const updated = catches.map((item) =>
           item === editCatch ? data : item
         );

         saveCatches(updated);
         setEditCatch(null);

       } else {

         saveCatches([
           ...catches,
           data
         ]);

       }

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
  onDelete={handleDelete}
  onEdit={handleEdit}
/>
    </div>
  }
/>

      </Routes>

      <BottomNavigation />

    </div>

  </>

  )
}

