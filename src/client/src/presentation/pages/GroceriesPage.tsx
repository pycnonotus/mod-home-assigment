import {GroceriesCategorise} from "../components/Groceries/GroceriesCategorise.tsx";
import {GroceriesItems} from "../components/Groceries/GroceriesItems.tsx";
import {Button, Grid, Stack} from "@mui/material";
import {Cart} from "../components/Carts/Cart.tsx";

export default function GroceriesPage() {

    return (
        <section>
            <Stack spacing={3} >
                <Grid container spacing={2}  >
                    <GroceriesCategorise/>
                    <GroceriesItems/>
                </Grid>

                <Cart />
                <Button variant="contained">
                    המשך הזמנה
                </Button>

            </Stack>

        </section>
    );
}