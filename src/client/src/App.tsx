import './App.css'
import {Route, Routes} from "react-router-dom";
import GroceriesPage from "./presentation/pages/groceriesPage.tsx";
import {Container} from "@mui/material";

function App() {

    return (
        <Container maxWidth={"md"}>

            <Routes>
                <Route path="/" element={<GroceriesPage/>}/>
            </Routes>
        </Container>
    )
}

export default App
