import {FormControl, Input, InputLabel} from "@mui/material";

export function OrderSummaryFormEmail() {
    return (
        <FormControl fullWidth>
            <InputLabel>
                כתובת מייל
            </InputLabel>
            <Input placeholder="exanple@mail.com"/>
        </FormControl>
    )
}