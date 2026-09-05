import {Stack} from "@mui/material";
import {OrderSummaryFormLastName} from "./OrderSummaryFormLastName.tsx";
import {OrderSummaryFormEmail} from "./OrderSummaryFormEmail.tsx";
import {OrderSummaryFormFirstName} from "./OrderSummaryFormFirstName.tsx";

export function OrderSummaryForm() {
    return (<Stack spacing={1}>
        <OrderSummaryFormFirstName/>
        <OrderSummaryFormLastName/>
        <OrderSummaryFormEmail/>
    </Stack>);
}