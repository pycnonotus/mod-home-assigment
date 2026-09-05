import './App.css'
import {Route, Routes} from "react-router-dom";
import GroceriesPage from "./presentation/pages/GroceriesPage.tsx";
import {Container} from "@mui/material";
import {OrderSummaryPage} from "./presentation/pages/OrderSummaryPage.tsx";

function App() {

    return (
        <Container maxWidth={"md"}>

            <Routes>
                <Route path="/" element={<GroceriesPage/>}/>
                <Route path="/order-summary" element={<OrderSummaryPage/>}/>
            </Routes>
        </Container>
    )
}

export default App
