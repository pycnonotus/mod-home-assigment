
import './App.css'
import {Route, Routes} from "react-router-dom";
import GroceriesPage from "./presentation/pages/groceriesPage.tsx";

function App() {

  return (
      <Routes>
          <Route path="/" element={<GroceriesPage />} />
      </Routes>
  )
}

export default App
