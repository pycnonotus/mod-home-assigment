import {FormControl, Input, InputLabel} from "@mui/material";

export function OrderSummaryFormFirstName() {
    return (<FormControl fullWidth>

        <InputLabel>
            שם פרטי
        </InputLabel>
        <Input placeholder="ישראל"/>
    </FormControl>);
}