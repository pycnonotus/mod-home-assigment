import {GroceriesCategorise} from "../components/GroceriesCategorise.tsx";
import {GroceriesItems} from "../components/GroceriesItems.tsx";
import {Button, Grid, Stack} from "@mui/material";
import {Cart} from "../components/Cart.tsx";

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