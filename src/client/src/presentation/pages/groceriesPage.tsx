import {GroceriesCategorise} from "../components/GroceriesCategorise.tsx";
import {GroceriesItems} from "../components/GroceriesItems.tsx";
import {Grid, Stack} from "@mui/material";

export default function GroceriesPage() {

    return (
        <section>
            <Stack spacing={2} >
                <Grid container spacing={2} >
                    <GroceriesCategorise/>
                    <GroceriesItems/>
                </Grid>

            </Stack>

        </section>
    );
}