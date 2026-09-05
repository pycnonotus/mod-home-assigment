import {Button, Stack} from "@mui/material";
import {Cart} from "../components/Carts/Cart.tsx";
import {OrderSummaryForm} from "../components/Order/OrderSummaryForm.tsx";

export function OrderSummaryPage() {
    return (
        <Stack>
            <OrderSummaryForm />
            <Cart />
            <Button variant="contained">
               אשר הזמהנה
            </Button>
        </Stack>
    );
}